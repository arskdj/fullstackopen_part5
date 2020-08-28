describe('Blog app', function() {
    const user =  {'_id':'5f3d623f14cfa280f05328de','name':'mario','blogs':['5a422a851b54a676234d17f7'],'username':'some1','password':'$2b$15$Yq.wgv7tJ0czSGZU6vOKDevQst1xNuOnA.OUNf8HSakkSAv7RVvvu','__v':0}

    const blog = { user: '5f3d623f14cfa280f05328de', _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 }

    before(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
    })

    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('login form is shown', function() {
        cy.get('form')
    })


    describe('Login', function(){
        it('succeeds with correct credentials', function() {
            cy.get('#username').type(user.username)
            cy.get('#password').type(user.password)
            cy.get('#login-button').click()
            cy.get('#welcome').contains('Welcome user !')
        })


        it('fails with wrong credentials', function() {
            cy.get('#login-button')
                .click()
                .get('#username').type('wrong user')
                .get('#password').type('1234')
                .get('#login-button').click()
                .get('#notification')
                .should('contain', 'user not found')
                .should('have.css', 'color','rgb(255, 0, 0)')

            cy.get('html').should('not.contain', 'Welcome user !')
        })



    })



    describe.only('When logged in', function() {
        beforeEach(function() {
            //login
            cy.request('POST', 'http://localhost:3000/api/login', {username:user.username, password:'1234'})
                .then(response => {
                    console.log(response)
                    localStorage.setItem('user', JSON.stringify(response.body.token))
                    cy.visit('http://localhost:3000')
                })
        })



        it('A blog can be created', function() {
            const newBlog = { title : 'thetestblog',
                url: 'thetesturl',
                author: 'thetestauthor'
            }
            cy.contains('add blog').click()

            cy.get('#blog-title').type(newBlog.title)
            cy.get('#blog-url').type(newBlog.url)
            cy.get('#blog-author').type(newBlog.author)
            cy.contains('submit').click()

            cy.contains(`blog added "${newBlog.title}" by "${newBlog.author}"`)
            cy.visit('http://localhost:3000')
            cy.contains(`${newBlog.title} by ${newBlog.author}`)
        })

        
        it.only('User can like a blog', function() {
            cy.contains('view').click()
            cy.get('#likes').then(($likes) => {
                const count = parseInt($likes.text())

                cy.contains('like').click()

                const newCount = parseInt($likes.text()) + 1
                
                expect(count + 1).to.eq(newCount)
            })
            
        })

    })

})
