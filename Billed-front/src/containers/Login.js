import { ROUTES_PATH } from '../constants/routes.js'
export let PREVIOUS_LOCATION = ''

// Nous utilisons une classe afin de tester ses méthodes dans les tests E2E
export default class Login {
  constructor({ document, localStorage, onNavigate, PREVIOUS_LOCATION, store }) {
    this.document = document
    this.localStorage = localStorage
    this.onNavigate = onNavigate
    this.PREVIOUS_LOCATION = PREVIOUS_LOCATION
    this.store = store

    // Attache des écouteurs d'événements aux soumissions de formulaire
    const formEmployee = this.document.querySelector(`form[data-testid="form-employee"]`)
    formEmployee.addEventListener("submit", this.handleSubmitEmployee)
    const formAdmin = this.document.querySelector(`form[data-testid="form-admin"]`)
    formAdmin.addEventListener("submit", this.handleSubmitAdmin)
  }

  // Gestionnaire de soumission de formulaire pour les employés
  handleSubmitEmployee = e => {
    e.preventDefault()

    // Extrait les informations de l'utilisateur du formulaire
    const user = {
      type: "Employee",
      email: e.target.querySelector(`input[data-testid="employee-email-input"]`).value,
      password: e.target.querySelector(`input[data-testid="employee-password-input"]`).value,
      status: "connected"
    }

    // Enregistre les informations de l'utilisateur dans le stockage local
    this.localStorage.setItem("user", JSON.stringify(user))

    // Tente de se connecter, crée un utilisateur si la connexion échoue
    this.login(user)
      .catch(
        (err) => this.createUser(user)
      )
      .then(() => {
        // Navigue vers la page des factures en cas de connexion réussie
        this.onNavigate(ROUTES_PATH['Bills'])
        this.PREVIOUS_LOCATION = ROUTES_PATH['Bills']
        PREVIOUS_LOCATION = this.PREVIOUS_LOCATION
        this.document.body.style.backgroundColor="#fff"
      })
  }

  // Gestionnaire de soumission de formulaire pour les administrateurs
  handleSubmitAdmin = e => {
    e.preventDefault()

    // Extrait les informations d'administrateur du formulaire
    const user = {
      type: "Admin",
      /* Les deux lignes suivantes résolvent le problème d'accès au compte admin */
      email: e.target.querySelector(`input[data-testid="admin-email-input"]`).value,
      password: e.target.querySelector(`input[data-testid="admin-password-input"]`).value,
      status: "connected"
    }

    // Enregistre les informations d'administrateur dans le stockage local
    this.localStorage.setItem("user", JSON.stringify(user))

    // Tente de se connecter, crée un utilisateur administrateur si la connexion échoue
    this.login(user)
      .catch(
        (err) => this.createUser(user)
      )
      .then(() => {
        // Navigue vers la page du tableau de bord en cas de connexion réussie
        this.onNavigate(ROUTES_PATH['Dashboard'])
        this.PREVIOUS_LOCATION = ROUTES_PATH['Dashboard']
        PREVIOUS_LOCATION = this.PREVIOUS_LOCATION
        document.body.style.backgroundColor="#fff"
      })
  }

  // Fonction de connexion (pas besoin de la couvrir par des tests)
  login = (user) => {
    if (this.store) {
      // S'il y a un magasin, tente de se connecter en utilisant la méthode de connexion du magasin
      return this.store
        .login(JSON.stringify({
          email: user.email,
          password: user.password,
        }))
        .then(({jwt}) => {
          // Si la connexion réussit, enregistre le JWT dans le stockage local
          localStorage.setItem('jwt', jwt)
        })
    } else {
      // S'il n'y a pas de magasin, retourne null
      return null
    }
    import { ROUTES_PATH } from '../constants/routes.js'
    export let PREVIOUS_LOCATION = ''
    
    // we use a class so as to test its methods in e2e tests
    export default class Login {
      constructor({ document, localStorage, onNavigate, PREVIOUS_LOCATION, store }) {
        this.document = document
        this.localStorage = localStorage
        this.onNavigate = onNavigate
        this.PREVIOUS_LOCATION = PREVIOUS_LOCATION
        this.store = store
        const formEmployee = this.document.querySelector(`form[data-testid="form-employee"]`)
        formEmployee.addEventListener("submit", this.handleSubmitEmployee)
        const formAdmin = this.document.querySelector(`form[data-testid="form-admin"]`)
        formAdmin.addEventListener("submit", this.handleSubmitAdmin)
      }
      handleSubmitEmployee = e => {
        e.preventDefault()
        const user = {
          type: "Employee",
          email: e.target.querySelector(`input[data-testid="employee-email-input"]`).value,
          password: e.target.querySelector(`input[data-testid="employee-password-input"]`).value,
          status: "connected"
        }
        this.localStorage.setItem("user", JSON.stringify(user))
        this.login(user)
          .catch(
            (err) => this.createUser(user)
          )
          .then(() => {
            this.onNavigate(ROUTES_PATH['Bills'])
            this.PREVIOUS_LOCATION = ROUTES_PATH['Bills']
            PREVIOUS_LOCATION = this.PREVIOUS_LOCATION
            this.document.body.style.backgroundColor="#fff"
          })
    
      }
    
      handleSubmitAdmin = e => {
        e.preventDefault()
        const user = {
          type: "Admin",
          email: e.target.querySelector(`input[data-testid="employee-email-input"]`).value,
          password: e.target.querySelector(`input[data-testid="employee-password-input"]`).value,
          status: "connected"
        }
        this.localStorage.setItem("user", JSON.stringify(user))
        this.login(user)
          .catch(
            (err) => this.createUser(user)
          )
          .then(() => {
            this.onNavigate(ROUTES_PATH['Dashboard'])
            this.PREVIOUS_LOCATION = ROUTES_PATH['Dashboard']
            PREVIOUS_LOCATION = this.PREVIOUS_LOCATION
            document.body.style.backgroundColor="#fff"
          })
      }
    
      // not need to cover this function by tests
      login = (user) => {
        if (this.store) {
          return this.store
          .login(JSON.stringify({
            email: user.email,
            password: user.password,
          })).then(({jwt}) => {
            localStorage.setItem('jwt', jwt)
          })
        } else {
          return null
        }
      }
    
      // not need to cover this function by tests
      createUser = (user) => {
        if (this.store) {
          return this.store
          .users()
          .create({data:JSON.stringify({
            type: user.type,
            name: user.email.split('@')[0],
            email: user.email,
            password: user.password,
          })})
          .then(() => {
            console.log(`User with ${user.email} is created`)
            return this.login(user)
          })
        } else {
          return null
        }
      }
    }
  }

  // Fonction de création d'un nouvel utilisateur (pas besoin de la couvrir par des tests)
  createUser = (user) => {
    if (this.store) {
      // S'il y a un magasin, tente de créer un nouvel utilisateur en utilisant la méthode d'utilisateurs du magasin
      return this.store
        .users()
        .create({data:JSON.stringify({
          type: user.type,
          name: user.email.split('@')[0],
          email: user.email,
          password: user.password,
        })})
        .then(() => {
          console.log(`Utilisateur avec ${user.email} a été créé`)
          return this.login(user)
        })
    } else {
      // S'il n'y a pas de magasin, retourne null
      return null
    }
  }
}
