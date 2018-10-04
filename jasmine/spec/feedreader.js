/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {
        /* 
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* test if each feed has a URL defined
         * and that the URL is not empty.
         */
         it('URL defined and not empty', function() {
            for (feed of allFeeds) {
            expect(feed.hasOwnProperty('url')).toBe(true);
            expect(feed.url.length).not.toBe(0);
            }
         })
        
        /* 
         * test if allFeeds object has a name defined
         * and that the name is not empty.
         */
         it('name defined and not empty', function() {
            for (feed of allFeeds) {
            expect(feed.hasOwnProperty('name')).toBe(true);
            expect(feed.name.length).not.toBe(0);
            }
         })
    });
    
    describe('The menu', function() {
        /* test if menu element is hidden by default. 
         */
          it('menu element hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })

         /*this tests to see if the menu display when
          * clicked and hides when clicked again.
          */
    
           it('menu changes visibility when menu icon is clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })
    })

    describe('Initial Entries', function() {
        //at least there should be a feed before you run the test
        beforeEach(done => {
            loadFeed(0, done);
        });

        it('At least a single entry element within feed when loa is called', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });

    });

    /* This test ensures when a new feed is loaded
     * by the loadFeed function the content actually changes.
     */
    describe('New Feed Selection', function() {
        let firstFeed,
            secondFeed;
        beforeEach(done => {
            loadFeed(0, function() {
                firstFeed = $('.feed').html();
                loadFeed(1, function() {
                    secondFeed = $('.feed').html();
                    done();
                });
            });
        });

        //this test compares the html content of both feeds
        it('content actually changes when a new feed is loaded', function() {
            expect(firstFeed === secondFeed).toBe(false);
        });
    });
   
}());
