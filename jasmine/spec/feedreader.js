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
    /* This suite is all about the RSS feeds definitions, the allFeeds variable
    in our application.*/
    describe('RSS Feeds', function() {
        /* tests to make sure that the allFeeds variable has been defined and
         *  that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* loops through each feed in the allFeeds object and
         * ensures it has a URL defined and that the URL is not empty.
         */
        it('URL are defined in each feed', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });



        /* loops through each feed in the allFeeds object and ensures it
         * has a name defined and that the name is not empty.
         */
        it('URL are defined in each feed', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* Tests the functionality of the menu when clicked and re-clicked*/
    describe('The menu', function() {
        /* test that the menu element is
         * hidden by default.
         */
        it('Menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Test that the menu changes visibility when the menu icon is clicked.
         * and hides when clicked again.
         */
        it('Menu is visible when clicked then invisible again', function() {
            $('.menu-icon-link').trigger('click'); //triggers the menu icons click event
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /* Tests that entries are available on app initialization */
    describe('Initial Entries', function() {
        //make sure feed is loaded asynchronously before test
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        /* Test that when the loadFeed function is called and
         * completes its work, there is at least a single .entry
         * element within the .feed container.
         */
        it('When loadFeed() called, there is atleast one .entry in .feed container',
            function(done) {
                expect($('.feed').find('.entry').length).toBeGreaterThan(0);
                done();
            });
    });

    /* Test that when a new feed is loaded by the loadFeed function
     * that the content actually changes.
     */
    describe('New Feed Selection', function() {
        // two sets of variables for the two feeds
        var title1, header1, title2, header2;
        //ensure feed data is loaded before test
        beforeEach(function(done) {
            loadFeed(0, function() {
                // will return many h2 entries but we will only get the first one
                title1 = $(".feed .entry-link .entry h2").html();
                //name of rss feed
                header1 = $(".header-title").html();
                loadFeed(1, function() {
                    title2 = $(".feed .entry-link .entry h2").html();
                    header2 = $(".header-title").html();
                    done();
                });
            });
        });
        //verify that the two feeds are different in header and the first entry
        it('Verify that a different feed has actually been selected',
            function(done) {
                expect(title1).not.toBe(title2);
                expect(header1).not.toBe(header2);
                done();
            });
    });
}());
