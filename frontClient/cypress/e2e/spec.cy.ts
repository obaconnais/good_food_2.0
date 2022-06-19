describe('user want to connect, check authentication', () => {

  it('check welcome page', () => {
    //check elements in the page
    cy.visit('/')
    cy.get('h1').should('have.text',' Best product for better experience ')
    cy.get('h2').should('have.text',' ... By Good-Food 2.0 ')
    cy.get('.question').should('have.text', 'Already taste it?')
    cy.get('.login').should('have.text','Yes, connect to my account')
    cy.get('.home').should('have.text',' No, begin my new experience')
  })

  it('check path to login page',()=>{
    //nav on login page
    cy.get('.login').click()
    //check if the url is correct
    cy.url().should('include', '/login')

  })

  it('check login page content', ()=>{
      //check if all elements is present in the page
      cy.get('.BackHome').should('have.text', 'Home')
      cy.get('.input1').invoke('attr','placeholder').should('contain', 'enter your login')
      cy.get('.input2').invoke('attr','placeholder').should('contain', 'enter your password')
      cy.get('button').should('have.text', ' Connect ')
  })

  it('check connect click without data',()=>{
    cy.get('button').click()
    //check if pop up is open
    cy.get('h4').should('have.text','Authentication failed')
    cy.get('p').should('have.text','login/password wrong!')
    cy.get('button[id="downCloseButton"]').should('have.text','Close')
    cy.get('button[id="downCloseButton"]').click()
  })

  it('check connect click with wrong data',()=>{
    cy.get(".input1").type('wrong data')
    cy.get(".input2").type('(wrong password')
    cy.get("button").click()
    cy.get('h4').should('have.text','Authentication failed')
    cy.get('p').should('have.text','login/password wrong!')
    cy.get('button[id="downCloseButton"]').should('have.text','Close')
    cy.get('button[id="downCloseButton"]').click()
  })

  it('check connect click with correct data',()=>{
    cy.get(".input1").type('fm.Voltaire@testwrong pa.com')
    cy.get(".input2").type('test')
    cy.get("button").click()
    //check if path is correct
    cy.url().should('include','/home')
  })
})
