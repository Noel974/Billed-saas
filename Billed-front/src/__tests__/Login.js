/**
 * @jest-environment jsdom
 */

// Importe les composants nécessaires pour les tests
import LoginUI from "../views/LoginUI";
import Login from "../containers/Login.js";
import { ROUTES } from "../constants/routes";
import { fireEvent, screen } from "@testing-library/dom";

// Suite de tests pour la page de connexion
describe("Given that I am a user on the login page", () => {

  // Tests pour le scénario où l'utilisateur n'entre pas d'informations et clique sur le bouton de connexion en tant qu'employé
  describe("When I do not fill fields and I click on the employee login button", () => {
    // Test : Vérifie que la page de connexion est rendue correctement
    test("Then It should render the login page", () => {
      document.body.innerHTML = LoginUI();

      // Vérifie que les champs d'email et de mot de passe sont vides
      const inputEmailUser = screen.getByTestId("employee-email-input");
      expect(inputEmailUser.value).toBe("");

      const inputPasswordUser = screen.getByTestId("employee-password-input");
      expect(inputPasswordUser.value).toBe("");

      // Récupère le formulaire et empêche son envoi par défaut
      const form = screen.getByTestId("form-employee");
      const handleSubmit = jest.fn((e) => e.preventDefault());
      form.addEventListener("submit", handleSubmit);

      // Déclenche l'événement de soumission du formulaire
      fireEvent.submit(form);

      // Vérifie que le formulaire de l'employé est toujours présent
      expect(screen.getByTestId("form-employee")).toBeTruthy();
    });
  });

  // Tests pour le scénario où l'utilisateur entre des informations incorrectes et clique sur le bouton de connexion en tant qu'employé
  describe("When I fill fields with incorrect format and I click on the employee login button", () => {
    // Test : Vérifie que la page de connexion est rendue correctement
    test("Then It should render the login page", () => {
      document.body.innerHTML = LoginUI();

      // Remplit les champs d'email et de mot de passe avec des données incorrectes
      const inputEmailUser = screen.getByTestId("employee-email-input");
      fireEvent.change(inputEmailUser, { target: { value: "pasunemail" } });
      expect(inputEmailUser.value).toBe("pasunemail");

      const inputPasswordUser = screen.getByTestId("employee-password-input");
      fireEvent.change(inputPasswordUser, { target: { value: "azerty" } });
      expect(inputPasswordUser.value).toBe("azerty");

      // Récupère le formulaire et empêche son envoi par défaut
      const form = screen.getByTestId("form-employee");
      const handleSubmit = jest.fn((e) => e.preventDefault());
      form.addEventListener("submit", handleSubmit);

      // Déclenche l'événement de soumission du formulaire
      fireEvent.submit(form);

      // Vérifie que le formulaire de l'employé est toujours présent
      expect(screen.getByTestId("form-employee")).toBeTruthy();
    });
  });

  // Tests pour le scénario où l'utilisateur entre des informations correctes et clique sur le bouton de connexion en tant qu'employé
  describe("When I fill fields with correct format and I click on the employee login button", () => {
    // Test : Vérifie que l'utilisateur est identifié en tant qu'employé dans l'application
    test("Then I should be identified as an Employee in the app", () => {
      document.body.innerHTML = LoginUI();
      const inputData = {
        email: "johndoe@email.com",
        password: "azerty",
      };

      // Remplit les champs d'email et de mot de passe avec des données correctes
      const inputEmailUser = screen.getByTestId("employee-email-input");
      fireEvent.change(inputEmailUser, { target: { value: inputData.email } });
      expect(inputEmailUser.value).toBe(inputData.email);

      const inputPasswordUser = screen.getByTestId("employee-password-input");
      fireEvent.change(inputPasswordUser, {
        target: { value: inputData.password },
      });
      expect(inputPasswordUser.value).toBe(inputData.password);

      // Récupère le formulaire et empêche son envoi par défaut
      const form = screen.getByTestId("form-employee");

      // Mocke la navigation pour les tests
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: jest.fn(() => null),
          setItem: jest.fn(() => null),
        },
        writable: true,
      });
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };

      let PREVIOUS_LOCATION = "";
      const store = jest.fn();

      // Initialise le composant de connexion
      const login = new Login({
        document,
        localStorage: window.localStorage,
        onNavigate,
        PREVIOUS_LOCATION,
        store,
      });

      const handleSubmit = jest.fn(login.handleSubmitEmployee);

      // Mocke la fonction de connexion pour qu'elle réussisse
      login.login = jest.fn().mockResolvedValue({});

      // Ajoute un gestionnaire d'événements pour l'événement de soumission du formulaire
      form.addEventListener("submit", handleSubmit);

      // Déclenche l'événement de soumission du formulaire
      fireEvent.submit(form);

      // Vérifie que la fonction de soumission du formulaire a été appelée
      expect(handleSubmit).toHaveBeenCalled();

      // Vérifie que la fonction de stockage local a été appelée avec les bonnes données
      expect(window.localStorage.setItem).toHaveBeenCalled();
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        "user",
        JSON.stringify({
          type: "Employee",
          email: inputData.email,
          password: inputData.password,
          status: "connected",
        })
      );
    });

    // Test : Vérifie que la page des notes de frais est rendue
    test("It should render the Bills page", () => {
      expect(screen.getAllByText("Mes notes de frais")).toBeTruthy();
    });
  });
});

// Suite de tests pour la page de connexion
describe("Given that I am a user on the login page", () => {

  // Tests pour le scénario où l'utilisateur n'entre pas d'informations et clique sur le bouton de connexion en tant qu'administrateur
  describe("When I do not fill fields and I click on the admin login button", () => {
    // Test : Vérifie que la page de connexion est rendue correctement
    test("Then It should render the login page", () => {
      document.body.innerHTML = LoginUI();

      // Vérifie que les champs d'email et de mot de passe sont vides
      const inputEmailUser = screen.getByTestId("admin-email-input");
      expect(inputEmailUser.value).toBe("");

      const inputPasswordUser = screen.getByTestId("admin-password-input");
      expect(inputPasswordUser.value).toBe("");

      // Récupère le formulaire et empêche son envoi par défaut
      const form = screen.getByTestId("form-admin");
      const handleSubmit = jest.fn((e) => e.preventDefault());
      form.addEventListener("submit", handleSubmit);

      // Déclenche l'événement de soumission du formulaire
      fireEvent.submit(form);

      // Vérifie que le formulaire de l'administrateur est toujours présent
      expect(screen.getByTestId("form-admin")).toBeTruthy();
    });
  });

  // Tests pour le scénario où l'utilisateur entre des informations incorrectes et clique sur le bouton de connexion en tant qu'administrateur
  describe("When I fill fields with incorrect format and I click on the admin login button", () => {
    // Test : Vérifie que la page de connexion est rendue correctement
    test("Then it should render the login page", () => {
      document.body.innerHTML = LoginUI();

      // Remplit les champs d'email et de mot de passe avec des données incorrectes
      const inputEmailUser = screen.getByTestId("admin-email-input");
      fireEvent.change(inputEmailUser, { target: { value: "pasunemail" } });
      expect(inputEmailUser.value).toBe("pasunemail");

      const inputPasswordUser = screen.getByTestId("admin-password-input");
      fireEvent.change(inputPasswordUser, { target: { value: "azerty" } });
      expect(inputPasswordUser.value).toBe("azerty");

      // Récupère le formulaire et empêche son envoi par défaut
      const form = screen.getByTestId("form-admin");
      const handleSubmit = jest.fn((e) => e.preventDefault());
      form.addEventListener("submit", handleSubmit);

      // Déclenche l'événement de soumission du formulaire
      fireEvent.submit(form);

      // Vérifie que le formulaire de l'administrateur est toujours présent
      expect(screen.getByTestId("form-admin")).toBeTruthy();
    });
  });

  // Tests pour le scénario où l'utilisateur entre des informations correctes et clique sur le bouton de connexion en tant qu'administrateur
  describe("When I fill fields with correct format and I click on the admin login button", () => {
    // Test : Vérifie que l'utilisateur est identifié en tant qu'administrateur dans l'application
    test("Then I should be identified as an HR admin in the app", () => {
      document.body.innerHTML = LoginUI();
      const inputData = {
        type: "Admin",
        email: "johndoe@email.com",
        password: "azerty",
        status: "connected",
      };

      // Remplit les champs d'email et de mot de passe avec des données correctes
      const inputEmailUser = screen.getByTestId("admin-email-input");
      fireEvent.change(inputEmailUser, { target: { value: inputData.email } });
      expect(inputEmailUser.value).toBe(inputData.email);

      const inputPasswordUser = screen.getByTestId("admin-password-input");
      fireEvent.change(inputPasswordUser, {
        target: { value: inputData.password },
      });
      expect(inputPasswordUser.value).toBe(inputData.password);

      // Récupère le formulaire et empêche son envoi par défaut
      const form = screen.getByTestId("form-admin");

      // Mocke la navigation pour les tests
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: jest.fn(() => null),
          setItem: jest.fn(() => null),
        },
        writable: true,
      });
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };

      let PREVIOUS_LOCATION = "";
      const store = jest.fn();

      // Initialise le composant de connexion
      const login = new Login({
        document,
        localStorage: window.localStorage,
        onNavigate,
        PREVIOUS_LOCATION,
        store,
      });

      const handleSubmit = jest.fn(login.handleSubmitAdmin);

      // Mocke la fonction de connexion pour qu'elle réussisse
      login.login = jest.fn().mockResolvedValue({});

      // Ajoute un gestionnaire d'événements pour l'événement de soumission du formulaire
      form.addEventListener("submit", handleSubmit);

      // Déclenche l'événement de soumission du formulaire
      fireEvent.submit(form);

      // Vérifie que la fonction de soumission du formulaire a été appelée
      expect(handleSubmit).toHaveBeenCalled();

      // Vérifie que la fonction de stockage local a été appelée avec les bonnes données
      expect(window.localStorage.setItem).toHaveBeenCalled();
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        "user",
        JSON.stringify({
          type: "Admin",
          email: inputData.email,
          password: inputData.password,
          status: "connected",
        })
      );
    });

    // Test : Vérifie que la page du tableau de bord RH est rendue
    test("It should render the HR dashboard page", () => {
      expect(screen.queryByText("Validations")).toBeTruthy();
    });
  });
});
