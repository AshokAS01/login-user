package database;

import java.sql.*;
import java.util.Locale;
import java.util.ResourceBundle;

public class DatabaseManager1 {

    private Connection con;
    private ResultSet rs;
    private String success;


    public DatabaseManager1() {


        con = null;
        rs = null;


        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {

            success = "failed";

        }
        try {
            //to get user name and password from .properties file

            Locale locale = new Locale("en", "US");
            ResourceBundle bundle = ResourceBundle.getBundle("database.credentials", locale);

            con = DriverManager.getConnection(bundle.getString("db.url2"), bundle.getString("db.username2"), bundle.getString("db.password2"));

            con.setAutoCommit(false); //to enable transactions
            success = "success";

        } catch (Exception e) {
            success = "failed";
            System.out.print(e.getMessage());
        }

    }


    /**
     * performs insert query on database specified by sqlStatement query
     * returns String "success" on completion without interruption and String "failed" in case of any Exception
     */
    public String insert(PreparedStatement insertStatement) {
        String success = "inserted";

        try {
            //preparing insert statement
            //st = con.prepareStatement(insertStatement);
            insertStatement.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
            //SQLException
            if (con != null) {
                try {
                    con.rollback();
                } catch (Exception e1) {
                    //cannot rollback
                    success = "failed";
                    return success;
                }
            }

            //System.out.println(e.getMessage());
            //success = "failed";
            success = e.getMessage();
            return success; //terminate the function
        }
        return success;
    }


    //for select statement on mysql db
    public ResultSet select(PreparedStatement selectStatement) {

        rs = null;
        try {

            rs = selectStatement.executeQuery();
        } catch (Exception e) {

            return rs; //return null if unable to perform select on the data
        }

        return rs;
    }

    /**
     * Used to perform update operation on database. Takes input update sql statement and return success in case of execution without interruption.
     */
    public String update(PreparedStatement updateStatement) {
        String success = "success";

        try {
            //st = con.prepareStatement(updateStatement);
            updateStatement.executeUpdate();
        } catch (Exception e) {
            //probably SQLException
            e.printStackTrace();
            success = "failed";
            return success;
        }


        return success;
    }


    /**
     * close() required to commit all changes to database
     * closes all the open connection in the db
     */
    //to close db connections
    public String close() {

        //REQUIRED for committing to the database.(for query to complete.)

        if (con != null) {   //closing connection
            try {
                con.commit();
                con.close();
            } catch (Exception e) {
                e.printStackTrace();
                return "failed";
            }
        }
        if (rs != null) {
            try {
                rs.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return "success";
    }

    public String getSuccess() {
        return success;
    }

    public PreparedStatement getPreparedStatement(String string) {
        PreparedStatement statement = null;
        try {
            statement = con.prepareStatement(string);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return statement;
    }
}