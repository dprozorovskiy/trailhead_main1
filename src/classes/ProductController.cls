public with sharing class ProductController {
  // This list can hold any product that implements the Product interface
  public List<Product> allProducts{get;set;}
 
  public ProductController() {
    allProducts = new List<Product>();
 
    // Instantiate some fruit and financial products
    FruitProduct banana = new FruitProduct('Banana', 1);
    FruitProduct dragonFruit = new FruitProduct('Dragon Fruit', 2.50); 
 
    FinancialProduct mortgage = new FinancialProduct('Mortgage', 100);
    FinancialProduct spreadBet = new FinancialProduct('Spread Bet', 5);
 
    // And add them to the list
    allProducts.add(banana);
    allProducts.add(dragonFruit);
    allProducts.add(mortgage);
    allProducts.add(spreadBet);
  }
}