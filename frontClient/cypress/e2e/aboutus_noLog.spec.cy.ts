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

  it('check the route to home',()=>{
    cy.get('.home').should('have.text',' No, begin my new experience').click()
    cy.url().should('include','http://localhost:4200/home')
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

  it('check Franchise Page',()=>{
    cy.get('div[id=footer_for]').click()
    cy.url().should('include','http://localhost:4200/home/aboutus')
    cy.get('img[id="logo"]').should('have.css','width')
    cy.get('button[class=signIn').should('have.text','Sign in')
    cy.get('div[id=footer_one]').should('have.text', 'FAQ')
    cy.get('div[id=footer_two]').should('have.text', 'Franchise')
    cy.get('div[id=footer_three]').should('have.text', 'Contact us')
    cy.get('div[id=footer_for]').should('have.text', 'About us')
    cy.get('p[id=para1]').should('have.text'," Good Food 2.0 was founded in 1992. The company came through a strong relationship between four food-corporate leaders. Cooking is a passion and particularly balanced meals. To do the best, this is relevant for us to purpose a cook different as the other-one. Based on fresh products, it is clothe to our heart to feel differents when you discover our taste. That's why you will begin a new experience in our restaurants. We are attached to choose the best products. ")
    cy.get('p[id=para2]').should('have.text', " The headquarter of our business is located in Paris. Since the Idea was born, company was grow across the word. All foodstuff are cultivated localy and meat are coming from selected farm. ")
  })

})
