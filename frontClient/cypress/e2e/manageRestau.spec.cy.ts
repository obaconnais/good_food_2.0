describe('user want to display information about franchise', () => {

  it('check welcome page', () => {
    //check elements in the page
    cy.visit('/')
    cy.get('h1').should('have.text',' Best product for better experience ')
    cy.get('h2').should('have.text',' ... By Good-Food 2.0 ')
    cy.get('.question').should('have.text', 'Already taste it?')
    cy.get('.login').should('have.text','Yes, connect to my account')
    cy.get('.home').should('have.text',' No, begin my new experience')
    cy.get('.home').click()
  })


  it('check home page',()=>{
    cy.get('img[id="logo"]').should('have.css','width')
    cy.get('button[class=signIn').should('have.text','Sign in')
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

  it('looking for restaurant without data',()=>{
    cy.get('button[id=valid]').click()
    cy.get('h4').should('have.text','No Zip Code!')
    cy.get('p[id="popup_content"]').should('have.text','zip code is required, please fill in it')
    cy.get('button[id="downCloseButton"]').should('have.text','Close').click()
  })

  it('looking for restaurant but no one',()=>{
    cy.get('select').select('France')
    cy.get('input').type("01000")
    cy.get('button[id=valid]').click()
    cy.get('h4').should('have.text','No new experience available !')
    cy.get('button[id="downCloseButton"]').should('have.text','Close').click()
  })

  it('select area',()=>{
    cy.get('select').select('France')
    cy.get('input').type("64000")
    cy.get('button[id="valid"]').click()
    cy.get('h4[class="modal-title"]').should('have.text',"Wich restaurant do you prefer? ")
    cy.get('a[id="nav"]').should('have.length','2')
    cy.get('button[id="downCloseButton"]').should('have.text','Close')
  })

  it('select restaurant and add recipe to cart',()=>{
    cy.get('ul>li').eq(0).click()
    cy.url().should('include', 'http://localhost:4200/home/menu')
    cy.get('img[id="logo"]').should('have.css','width')
    cy.get('div[id=footer_one]').should('have.text', 'FAQ')
    cy.get('div[id=footer_two]').should('have.text', 'Franchise')
    cy.get('div[id=footer_three]').should('have.text', 'Contact us')
    cy.get('div[id=footer_for]').should('have.text', 'About us')
    cy.get('p[class="title_name1"]').should('have.text',' Menu for ')
    cy.get('p[class="title_name2"]').should('have.text',' la table royale ')
    cy.get('p[class="title_boulet"]').should('have.length','2')
    cy.get('i[id="i_restaurant"]').should('have.text', ' Restaurant : la table royale')
    cy.get('h5').should('have.length','3')
    cy.get('button[id="addButton"]').eq(1).click()
  })

  it('go back to home page and select new area',()=>{
    cy.get('img[id="logo"]').click()
    cy.get('select').select('Luxembourg')
    cy.get('input').type("1450")
    cy.get('button[id="valid"]').click()
    cy.wait(20000)
    cy.get('h4[class="modal-title"]').should('have.text',"Wich restaurant do you prefer? ")
    cy.get('a[id="nav"]').should('have.length','1')
    cy.get('button[id="downCloseButton"]').should('have.text','Close')
  })

  it('select restaurant and add recipe to cart',()=>{
    cy.get('ul>li').eq(0).click()
    cy.url().should('include', 'http://localhost:4200/home/menu')
    cy.get('img[id="logo"]').should('have.css','width')
    cy.get('div[id=footer_one]').should('have.text', 'FAQ')
    cy.get('div[id=footer_two]').should('have.text', 'Franchise')
    cy.get('div[id=footer_three]').should('have.text', 'Contact us')
    cy.get('div[id=footer_for]').should('have.text', 'About us')
    cy.get('p[class="title_name1"]').should('have.text',' Menu for ')
    cy.get('p[class="title_name2"]').should('have.text',' au bon miam ')
    cy.get('p[class="title_boulet"]').should('have.length','2')
    cy.get('i[id="i_restaurant"]').should('have.text', ' Restaurant : au bon miam')
    cy.get('h5').should('have.length','4')
  })
})
