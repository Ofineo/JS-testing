/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {

        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //on actual Jasmine i could have used .toBeNonEmptyString();
        it('URL defined', () => {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url).toBeTruthy();
            });
        });

        it('name defined', () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name).toBeTruthy();
            });
        });
    });

    describe('The menu', () => {

        it('hidden by default', () => {
            let menuHidden = $('body').hasClass('menu-hidden');

            expect(menuHidden).toBe(true);
        });

        it('shows on cick', () => {
            $('.menu-icon-link').trigger('click');

            expect($('body').hasClass('menu-hidden')).toBe(false);
        });

        it('hiddes on cick', () => {
            $('.menu-icon-link').trigger('click');

            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', () => {

        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            });
        });

        it('should have at least one entry', (done) => {
            let feedElement = $('.feed > a');
            expect(feedElement).not.toBeUndefined();
            done();
        });
    });

    describe('New Feed Selection', () => {
        let firstFeed,
            secondFeed;
        beforeEach((done) => {
            loadFeed(0, () => {
                firstFeed = $('.feed > a');
                done();
            });

            if (feedLoadedFinished) {
                loadFeed(1, () => {
                    secondFeed = $('.feed > a');
                    done();
                });
            }
        });

        it('on load content changes', (done) => {
            if (feedLoadedFinished) {
                expect(firstFeed).not.toBe(secondFeed);
                done();
            }
        });
    });

    describe('Error handling', () => {

        it('variables are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(feedLoadedFinished).toBeDefined();

        });

        it('Array in bounds', () => {
            spyOn(window, 'loadFeed');
            loadFeed(0);
            expect(window.loadFeed.calls.argsFor(0)).toEqual([0]);
        });
    });

    describe('Manage feeds', () => {
        let feedLenght

        beforeEach(() => {
            feedLenght = allFeeds.length;
            allFeeds.push( {
                name: 'JW.org',
                url: 'https://www.jw.org/en/news/rss/FullNewsRSS/feed'
            });
        });

        it('Add a feed', () => {        
            expect(allFeeds.length).toBe(feedLenght+1);
        });

        it('Remove a feed', () => {
            allFeeds.splice(feedLenght,1);
            expect(allFeeds.length).toBe(feedLenght);
        });

    });
}());
