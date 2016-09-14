function checkIfBookIsForLoan(book) {

}

function checkIfBookIsForSale(book) {

}

function checkIfUserCanReturnBook(book) {

}

function getAmazonBookCover(ISBN) {
    var url = "http://images.amazon.com/images/P/" + ISBN;
    //eg ISBN 0738202967 isbn-10
    //http://images.amazon.com/images/P/0738202967
    url = "http://images.amazon.com/images/P/" + 0738202967;
    ISBN = 0738202967;
    
}


module.exports = {
    getAmazonBookCover: getAmazonBookCover
}
