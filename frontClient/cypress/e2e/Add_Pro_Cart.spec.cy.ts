describe('user want to add product in cart and watch it', () => {
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
    cy.get('button[id="dropdown"]').should('have.text',' Account')
    cy.get('p[class="title_title"').should('have.text','Good Food 2.0')
    cy.get('option[value=""]').should('have.text','Select Country')
    cy.get('input').invoke('attr','placeholder').should('contain', 'enter your zip code')
    cy.get('div[id=footer_one]').should('have.text', 'FAQ')
    cy.get('div[id=footer_two]').should('have.text', 'Franchise')
    cy.get('div[id=footer_three]').should('have.text', 'Contact us')
    cy.get('div[id=footer_for]').should('have.text', 'About us')
    cy.get('button[id=valid]').should('have.text', ' Valid ')
    cy.get('img').should('have.length', '4')
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
    cy.get('button[id="dropdown"]').should('have.text',' Account')
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

  it('nav to Cart page and check',()=>{
    cy.get('button[id="cart"]').should('have.text',' Cart ').click()
    cy.url().should('include', 'http://localhost:4200/home/cart')
    cy.get('button[id="dropdown"]').should('have.text',' Account')
    cy.get('img[id="logo"]').should('have.css','width')
    cy.get('div[id=footer_one]').should('have.text', 'FAQ')
    cy.get('div[id=footer_two]').should('have.text', 'Franchise')
    cy.get('div[id=footer_three]').should('have.text', 'Contact us')
    cy.get('div[id=footer_for]').should('have.text', 'About us')
    cy.get('button[id="cart"]').should('have.text',' Cart ')
    cy.get('i[id="i_restaurant"]').should('have.text', ' Restaurant : la table royale')
    cy.get('div[class="recipe_name"]').eq(0).should('have.text','Pates carbonara')
    cy.get('div[class="recipe_price"]').eq(0).should('have.text','13 €')
    cy.get('button[class="button"]').eq(0).should('have.text','delete')
    cy.get('button[id="+"]').eq(0).should('have.text',' + ')
    cy.get('button[id="-"]').eq(0).should('have.text',' - ')
    cy.get('div[class="textManage"').eq(0).should('have.text','1')
    cy.get('button[class="total_button"]').should('have.text','Order now')
    cy.get('p[class="total_text"]').should('have.text', ' Total: 13 € ')
    cy.get('h4[id="header"]').should('have.text', ' Your cart ')
    cy.get('input[class="input"]').invoke('attr','placeholder').should('contain', 'promo code')
  }),

  it('delete recipe of cart',()=>{
    cy.get('button[class="button"]').eq(0).click()
    cy.get('p[class="total_text"]').should('have.text', ' Total: 0 € ')
    cy.get('h4[id="header"]').should('have.text', ' Your cart  is empty ! ')
    cy.get('div[class="noRecipe"]').should('have.length','1')
  })

  it('navigtion to menu through restaurant button and add 2 recipes',()=>{
    cy.get('i[id="i_restaurant"]').click()
    cy.url().should('include', 'http://localhost:4200/home/menu')
    cy.get('button[id="dropdown"]').should('have.text',' Account')
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
    cy.get('button[id="addButton"]').eq(2).click()
  })

  it('nav to cart and check',()=>{
    cy.get('button[id="cart"]').should('have.text',' Cart ').click()
    cy.url().should('include', 'http://localhost:4200/home/cart')
    //check first recipe
    cy.get('h4[id="header"]').should('have.text', ' Your cart ')
    cy.get('div[class="recipe_name"]').eq(0).should('have.text','Pates carbonara')
    cy.get('div[class="recipe_price"]').eq(0).should('have.text','13 €')
    cy.get('button[class="button"]').eq(0).should('have.text','delete')
    cy.get('button[id="+"]').eq(0).should('have.text',' + ')
    cy.get('button[id="-"]').eq(0).should('have.text',' - ')
    cy.get('div[class="textManage"').eq(0).should('have.text','1')
    //check second recipe
    cy.get('div[class="recipe_name"]').eq(1).should('have.text','Pates bolognaise')
    cy.get('div[class="recipe_price"]').eq(1).should('have.text','13 €')
    cy.get('button[class="button"]').eq(1).should('have.text','delete')
    cy.get('button[id="+"]').eq(1).should('have.text',' + ')
    cy.get('button[id="-"]').eq(1).should('have.text',' - ')
    cy.get('div[class="textManage"').eq(1).should('have.text','1')

    cy.get('input[class="input"]').invoke('attr','placeholder').should('contain', 'promo code')
    cy.get('button[class="total_button"]').should('have.text','Order now')
    cy.get('p[class="total_text"]').should('have.text', ' Total: 26 € ')
  })

  it('add one recipe in the cart', ()=>{
    cy.get('button[id="+"]').eq(0).click()
    cy.get('p[class="total_text"]').should('have.text', ' Total: 39 € ')
    cy.get('div[class="textManage"').eq(0).should('have.text','2')
  })

  it('delete one recipe in the cart with - button', ()=>{
    cy.get('button[id="-"]').eq(1).click()
    cy.get('p[class="total_text"]').should('have.text', ' Total: 26 € ')
    cy.get('button[id="-"]').should('have.length','1')
  })
})
