describe('Checking all form inputs and submit button', () => {
    const nameInput = () => cy.get('[name="name"]')
    const phoneInput = () => cy.get('[name="phone"]')
    const pepperoniInput = () => cy.get('[name="pepperoni"]')
    const baconInput = () => cy.get('[name="bacon"]')


beforeEach(() => {
    cy.visit('http://localhost:3000/pizza')
})

it('renders properly', () => {
    nameInput().should('exist')
    phoneInput().should('exist')
    pepperoniInput().should('exist')
    baconInput().should('exist')
})

it('can type in inputs', () => {
    const name = 'Monica'
    const phone = 'madmonnie@gmail.com'

    nameInput().type(name).should('have.value', name)
    phoneInput().type(phone).should('have.value', phone)
})

it('can check multiple toppings', () => {
    cy.get('[type="checkbox"]').check()
    cy.get('[type="checkbox"]').should('be.checked')
})

it('can submit form', () => {
    cy.get('form').submit
})

it('cannot submit empty form', () => {
    nameInput().clear()
    cy.get('[type="submit"]').should('be.disabled')
})
})
