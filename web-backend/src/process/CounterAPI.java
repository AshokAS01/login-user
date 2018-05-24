package process;

import database.DatabaseManager;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class CounterAPI extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        if (request.getServletPath().equals("/getPOSMachines")) {
            JSONArray readersList = new JSONArray();
            try {

                //from SQL server
                DatabaseManager db = new DatabaseManager();
                if (db.getSuccess().equals("success")) {
                    String selectUniqueCardsString = "SELECT DISTINCT reader_id" +
                            "  FROM public.\"SQLserver\";";
                    PreparedStatement selectUniqueCardsStatement = db.getPreparedStatement(selectUniqueCardsString);

                    ResultSet rsReaders = db.select(selectUniqueCardsStatement);
                    JSONObject reader;
                    int readerNumber = 0;
                    while (rsReaders.next()) {
                        reader = new JSONObject();
                        readerNumber++;
                        reader.put("id", Integer.toString(readerNumber));
                        reader.put("readerName", rsReaders.getString("reader_id"));

                        readersList.put(reader);
                    }
                }
                db.close();

            } catch (Exception e) {
                e.printStackTrace();
            }

            out.print(readersList);
        }

    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        if (request.getServletPath().equals("/getRecordsCounter")) {

            JSONArray counterData = new JSONArray();
            JSONObject counter = new JSONObject();
            try {
                String readerID = request.getParameter("readerID");

                DatabaseManager db = new DatabaseManager(); //connecting to SQL database
                if (db.getSuccess().equals("success")) {
                    String selectCounterString = "SELECT count(serial) as counter" +
                            "  FROM public.\"SQLserver\" WHERE date = now()::date AND reader_id = ?;";
                    PreparedStatement selectCounterStatement = db.getPreparedStatement(selectCounterString);
                    selectCounterStatement.setString(1, readerID);
                    ResultSet rsCounter = db.select(selectCounterStatement);
                    if (rsCounter.next()) {
                        counter.put("counter", rsCounter.getInt("counter"));
                    }
                }
                db.close();
            } catch (Exception e) {
                e.printStackTrace();
            }

            counterData.put(counter);
System.out.println(counterData);
            out.print(counterData); //printing counter

        }
    }
}
