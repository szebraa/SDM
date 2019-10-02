import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import javax.swing.JApplet;

public class Filter extends JApplet
{
    private String alarmsToFilter;
    public Filter()
    {
      this.alarmsToFilter = "";
      
    }

    public Filter(String x)
    {
        this.alarmsToFilter = x;
        
    }
    public void setAlarmsToFilter(String x)
    {
        this.alarmsToFilter = x;
    }
    
    public String getAlarmsToFilter()
    {
        return this.alarmsToFilter;
    }
    //insert logic to check if the file exists, if so, write to it, else create it then write to it
    public void writeTxtFile() throws IOException
    {  
        File alarmsToFiltertxt = new File("/var/www/html/alarmsToFilter.txt");
        alarmsToFiltertxt.createNewFile(); //This won't do anythin if the file already exists
        //Overwrite file each time I write to it:
        FileWriter overWriteFile = new FileWriter(alarmsToFiltertxt, false);  
        overWriteFile.write(this.alarmsToFilter);
        overWriteFile.close();

    }


}
