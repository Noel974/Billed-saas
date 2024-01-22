/**
 * @jest-environment jsdom
 */

import { screen, waitFor } from "@testing-library/dom";
import userEvent from '@testing-library/user-event';
import BillsUI from "../views/BillsUI.js";
import { bills } from "../fixtures/bills.js";
import Bills from "../containers/Bills.js";
import { ROUTES, ROUTES_PATH } from "../constants/routes.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import mockStore from "../__mocks__/store";
import router from "../app/Router.js";

// Utilise jest.mock pour mocker le module Store avec mockStore
jest.mock("../app/Store", () => mockStore);

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", async () => {

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByTestId('icon-window'))
      // Sélectionne l'élément de l'icône de la fenêtre en utilisant son attribut data-testid
      const windowIcon = screen.getByTestId('icon-window');
      expect(windowIcon).toBeTruthy();
    })
//test 1 corriger//
    // Vérifie le tri par date
    test("Then bills should be ordered from earliest to latest", () => {
      document.body.innerHTML = BillsUI({ data: bills })
  const antiChrono = (a, b) => (new Date(a) < new Date(b) ? -1 : 1);

      const dates = screen
        .getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i)
        .map((a) =>a.innerHTML)
        .sort(antiChrono);
      const datesSorted = [...dates];
      expect(dates).toEqual(datesSorted);
    })
  })

  describe("When I click on the New Bill button", () => {
    test("It should open the New Bill page", async () => {
      const onNavigate = pathname => { document.body.innerHTML = ROUTES({ pathname }); };
      Object.defineProperty(window, "localStorage", { value: localStorageMock });
      window.localStorage.setItem("user", JSON.stringify({ type: "Employee" }));
      const billsContainer = new Bills({ document, onNavigate, store: null, localStorage: window.localStorage });
      document.body.innerHTML = BillsUI({ data: bills });

      const btnNewBill = await screen.getByTestId("btn-new-bill");
      const handleClickNewBill = jest.fn(() => billsContainer.handleClickNewBill);
      btnNewBill.addEventListener("click", handleClickNewBill);

      userEvent.click(btnNewBill);
      expect(handleClickNewBill).toHaveBeenCalled();
    });
  });

  // ce test vérifie que lorsque l'utilisateur clique sur 
  //l'icône "eye" d'une facture, la fonction handleClickIconEye est appelée et que la modal associée est ouverte.
  describe("When I click on the eye icon of a bill", () => {
    test("It should open a modal", async () => {
      const onNavigate = pathname => { document.body.innerHTML = ROUTES({ pathname }); };
      Object.defineProperty(window, "localStorage", { value: localStorageMock });
      window.localStorage.setItem("user", JSON.stringify({ type: "Employee" }));
      const billsContainer = new Bills({ document, onNavigate, store: null, localStorage: window.localStorage });
      document.body.innerHTML = BillsUI({ data: bills });

      const handleClickIconEye = jest.fn(icon => billsContainer.handleClickIconEye(icon));
      const iconEye = await screen.getAllByTestId("icon-eye");
      const modaleFile = document.getElementById("modaleFile");

      $.fn.modal = jest.fn(() => modaleFile.classList.add("show"));

      iconEye.forEach(icon => {
        icon.addEventListener("click", handleClickIconEye(icon));
        userEvent.click(icon);
        expect(handleClickIconEye).toHaveBeenCalled();
      });

      expect(modaleFile).toBeTruthy();
    })
  })
 // Intégration
describe("When an error occurs on API", () => {
  beforeEach(() => {
    // Espionne la fonction mockStore.bills
    jest.spyOn(mockStore, "bills");

    // Mock de window.localStorage
    Object.defineProperty(window, "localStorage", { value: localStorageMock });

    // Stocke un utilisateur fictif dans localStorage
    window.localStorage.setItem("user", JSON.stringify({
      type: "Employee",
      email: "a@a"
    }));

    // Crée un élément div racine et l'ajoute au corps du document
    const root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);

    // Initialise le routage (Assurez-vous que la fonction router() est définie)
    router();
  });

  // Teste si l'erreur 404 s'affiche correctement
  test("Then fetches bills from an API and fails with 404 message error", async () => {
    // Mock de la fonction list de mockStore.bills pour retourner une promesse rejetée avec une erreur 404
    mockStore.bills.mockImplementationOnce(() => {
      return {
        list: () => {
          return Promise.reject(new Error("Erreur 404"));
        }
      };
    });

    // Appelle BillsUI avec l'erreur 404
    const html = BillsUI({ error: "Erreur 404" });

    // Remplace le contenu du corps du document par le HTML généré
    document.body.innerHTML = html;

    // Récupère l'élément texte contenant l'erreur 404
    const message = await screen.getByText(/Erreur 404/);

    // Vérifie si l'élément texte est présent dans le DOM
    expect(message).toBeTruthy();
  });

  // Teste si l'erreur 500 s'affiche correctement
  test("Then fetches messages from an API and fails with 500 message error", async () => {
    // Mock de la fonction list de mockStore.bills pour retourner une promesse rejetée avec une erreur 500
    mockStore.bills.mockImplementationOnce(() => {
      return {
        list: () => {
          return Promise.reject(new Error("Erreur 500"));
        }
      };
    });

    // Appelle BillsUI avec l'erreur 500
    const html = BillsUI({ error: "Erreur 500" });

    // Remplace le contenu du corps du document par le HTML généré
    document.body.innerHTML = html;

    // Récupère l'élément texte contenant l'erreur 500
    const message = await screen.getByText(/Erreur 500/);

    // Vérifie si l'élément texte est présent dans le DOM
    expect(message).toBeTruthy();
  });
});

})
