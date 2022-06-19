describe('user want to watch all informations about contactus', () => {

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

  it('check connect click with correct data',()=>{
    cy.get(".input1").type('fm.Voltaire@test.com')
    cy.get(".input2").type('test')
    cy.get("button").click()
    //check if path is correct
    cy.url().should('include','/home')
    cy.get('button[id=dropdown]').should('have.text',' Account')
  })

  it('check home page',()=>{
    cy.get('img[id="logo"]').should('have.css','width')
    // cy.get('button[class=signIn').should('have.text','Sign in')
    cy.get('p[class="title_title"').should('have.text','Good Food 2.0')
    cy.get('option[value=""]').should('have.text','Select Country')
    cy.get('input').invoke('attr','placeholder').should('contain', 'enter your zip code')
    cy.get('option[value=""]').should('have.text','Select Country')
    cy.get('div[id=footer_one]').should('have.text', 'FAQ')
    cy.get('div[id=footer_two]').should('have.text', 'Franchise')
    cy.get('div[id=footer_three]').should('have.text', 'Contact us')
    cy.get('div[id=footer_for]').should('have.text', 'About us')
    cy.get('button[id=valid]').should('have.text', ' Valid ')
    cy.get('img').should('have.length', '4')
  })

  it('check FAQ Page',()=>{
    cy.get('div[id=footer_three]').click()
    cy.url().should('include','http://localhost:4200/home/contactus')
      cy.get('img[id="logo"]').should('have.css','width')
    cy.get('div[id=footer_one]').should('have.text', 'FAQ')
    cy.get('div[id=footer_two]').should('have.text', 'Franchise')
    cy.get('div[id=footer_three]').should('have.text', 'Contact us')
    cy.get('div[id=footer_for]').should('have.text', 'About us')
    cy.get('p[id="title_mail"]').should('have.text','Mail:')
    cy.get('p[id="mail"]').should('have.text','good.food@gmail.com')
    cy.get('p[id="title_phone"]').should('have.text','Phone:')
    cy.get('p[id="phone"]').should('have.text','+33 1.70.12.24.35')
    cy.get('p[id="title_address"]').should('have.text','Address:')
    cy.get('p[id="address"]').should('have.text',' 24 avenue du bon moment 75000 PARIS')
  })

})
