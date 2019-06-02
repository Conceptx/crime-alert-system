import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Test {
    public static void main(String[] args) {

        HttpURLConnection connection = null;
        BufferedReader reader;
        String line;
        StringBuffer responseContent = new StringBuffer();

        try {
            String querystring = "" + -17.00 + "/" + "" + 30.00;
            URL url = new URL("http://127.0.0.1:3000/getContact/" + querystring);
            connection = (HttpURLConnection) url.openConnection();

            // Request setup
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(6000);
            connection.setReadTimeout(6000);

            int status = connection.getResponseCode();

            if (status > 299) {
                reader = new BufferedReader((new InputStreamReader((connection.getErrorStream()))));
                while ((line = reader.readLine()) != null) {
                    responseContent.append(line);
                }
                reader.close();
                System.out.println(responseContent.toString());
            } else {
                reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                while ((line = reader.readLine()) != null) {
                    responseContent.append(line);
                }
                reader.close();
                System.out.println(responseContent.toString());
            }
        } catch (MalformedURLException e) {
            System.out.println(e.getMessage());
        } catch (IOException ae) {
            System.out.println(ae.getMessage());
        } finally {
            connection.disconnect();
        }
    }
}