@isTest
public class TestVerifyDate {
    @isTest static void testCheckDates1() {
        Date res = VerifyDate.CheckDates(date.newInstance(2018, 06, 01), date.newInstance(2018, 06, 04));
        System.assertEquals(date.newInstance(2018, 06, 01), res);
    }
    
    @isTest static void testCheckDates2() {
        Date res = VerifyDate.CheckDates(date.newInstance(2018, 06, 01), date.newInstance(2018, 07, 04));
        System.assertEquals(date.newInstance(2018, 06, 01), res);
    }
}