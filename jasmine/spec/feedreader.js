/* feedreader.js



/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */


$(function () {

    "use strict";

    describe('RSS Feeds', function () {

        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /*on the current version of Jasmine i could have used .toBeNonEmptyString();
        *Test `allFeeds` object and ensures it has a URL defined and that the URL is not empty.
        */
        it('URL defined', () => {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url).toBeTruthy();
            });
        });
        /*Test `allFeeds` object and ensures it has a name defined and that the name is not empty.
        */
        it('name defined', () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name).toBeTruthy();
            });
        });
    });

    describe('The menu', () => {

        /*Test that the menu element is hidden by default.
        */
        it('hidden by default', () => {
            let menuHidden = $('body').hasClass('menu-hidden');

            expect(menuHidden).toBe(true);
        });

        /*Tests to make sure the menu changes visibility when the menu icon is clicked.
        */
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
            loadFeed(0, done);
        });
        /*Test `loadFeed` function. when called and complete, 
        * it should be at least, a single `.entry` element within the `.feed` container.
        */
        it('should have at least one entry', (done) => {
            let feedElement = $('.feed > a');
            expect(feedElement.length).not.toBe(0);
            done();
        });
    });

    describe('New Feed Selection', () => {

        let firstFeed,
            secondFeed;
        /*The second call to the function is wrapped in the done function to make sure
        * the first feeds are finished loading.
        */
        beforeEach((done) => {
            loadFeed(0, () => {
                firstFeed = $('.feed a .entry ').html;
                done(loadFeed(1, () => {
                    secondFeed = $('.feed > a').html;
                    done();
                }));
            });
        });

        /*Test make sure that when a new feed is loaded by the `loadFeed` 
        * function that the content actually changes.
        */
        it('on load content changes', (done) => {
            expect(firstFeed).not.toBe(secondFeed);
            done();
        });
    });

    describe('Error handling', () => {

        /*Check if variables are defined
        */
        it('variables are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(feedLoadedFinished).toBeDefined();
        });

        /*Check if that when we call the Object is its bounds
        */
        it('Array in bounds', () => {
            spyOn(window, 'loadFeed');
            loadFeed(0);
            expect(window.loadFeed.calls.argsFor(0)).toEqual([0]);
        });
    });

    describe('Manage feeds', () => {
        let feedLenght,
            newFeed;
            

        beforeEach(() => {
            feedLenght = allFeeds.length;
            newFeed = {
                name: 'JW News',
                url: 'https://www.jw.org/en/news/rss/FullNewsRSS/feed'
            };
            allFeeds.push(newFeed);
        });

        /*Test `allFeeds` object and ensures that the object increases when we add an extra feed.
        */
        it('Add a feed', () => {
            expect(allFeeds.length).toBe(feedLenght + 1);
            expect(allFeeds[allFeeds.length - 1]).toBe(newFeed);
        });

        /*Test `allFeeds` object and ensures that  the object decreases when we remove our 
        // *selected feed.
        */
        it('Remove a feed', () => {           
            allFeeds.splice(feedLenght, 1);

            expect(allFeeds.length).toBe(feedLenght);
            expect(allFeeds.find((element)=>{
                return element === newFeed;
            })).toBeUndefined;
        });

    });
}());
