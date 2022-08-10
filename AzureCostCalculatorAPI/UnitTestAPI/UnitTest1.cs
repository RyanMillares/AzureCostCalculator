using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

using AzureCostCalculatorAPI.Controllers;

// using AzureCostCalculatorAPI;

namespace UnitTestAPI
{
    [TestClass]
    
    // RETRIEVAL TESTING
    // Does the API correctly retrieve data from the database?
    // Compare expected and actual returned values, given known DB state.

    // Each "unit" is a request and fields in that request, test these

    public class UnitTest1
    {
        [TestMethod]
        public void TestEmptyGUID()
        {
            IaaSAPIController ctrl = new IaaSAPIController();
            // init, assert expectation, repeat for other tests
        }
    }

    // TODO put these into other test files

    // MATH TESTS
    // Does the Frontend correctly perform math checks?
    // Ensure user is limited to A+B+C=N servers for a server count N
    /*
     
     */
    

}
