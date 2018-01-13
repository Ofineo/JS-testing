##Project Overview

This is a web-based application that reads RSS feeds.
It has preloaded our favorite RSS feeds. You can switch between the 4 different RSS by clicking on the hamburguer menu icon. That will load the selected feeds and you can click on any interesting article you find that will take you straight to the article on the site.

##Instructions

To run the web page double click on the index.html file. 
Once the site has complete loading you will find the Jasmine test bar at the bottom of the page. The bar will give you an overview of the test suites and the individual test as well as the result of all the tests.
Any test that didn't pass will show a red cross and have further explanation below.


##Tests Available

1.  Test `allFeeds` object and ensures it has a URL defined and that the URL is not empty.
2.  Test `allFeeds` object and ensures it has a name defined and that the name is not empty.
3.  Test that the menu element is hidden by default.
4.  Test to make sure the menu changes visibility when the menu icon is clicked.
5.  Test `loadFeed` function. when called and complete, it should be at least, a single `.entry` element within the `.feed` container.
6.  Test make sure that when a new feed is loaded by the `loadFeed` function that the content actually changes.

#**Udacious Test Coverage

1.  Test `allFeeds` object and ensures that the object increases when we add an extra feed. Make sure when its implemented in the future that we can add our own feeds.
2.  Test `allFeeds` object and ensures that  the object decreases when we remove our selected feed. Test to make sure we can remove a feed.
