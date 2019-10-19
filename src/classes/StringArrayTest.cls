public class StringArrayTest {
    public static String[] generateStringArray(Integer i) {
        String[] ArrayTest = new String[i];
        for (Integer j=0;j<i;j++) {
           ArrayTest[j] = 'Test ' + j;
           System.debug(ArrayTest[j]);
        }
        return ArrayTest;
    }
}