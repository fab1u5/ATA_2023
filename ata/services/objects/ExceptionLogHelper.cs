using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public enum ExceptionLogOperation
    {
        Found,
        Add,
        Delete
    }
    public class ExceptionLogHelper
    {
        private const string FILE_NAME = "ATALog.txt";
        private static string LogFileName
        {
            get
            {
                return System.AppDomain.CurrentDomain.BaseDirectory + FILE_NAME;
            }
        }

        public static void Log(String msg)
        {
            if (!Properties.Settings.Default.LogExceptions)
                return;

            try {
                if (!File.Exists(LogFileName)) {
                    File.Create(LogFileName).Dispose();
                }
                using (StreamWriter sw = File.AppendText(LogFileName)) {
                    sw.WriteLine("===========Start============= " + DateTime.Now);
                    sw.WriteLine("Message: " + msg);
                    sw.WriteLine("===========End============= " + DateTime.Now);
                }
            }

            catch (Exception e) {
                Console.Error.Write(e.ToString());
            }
        }

        public static void Error(Exception ex)
        {
            if (!Properties.Settings.Default.LogExceptions)
                return;

            try {
                if (!File.Exists(LogFileName)) {
                    File.Create(LogFileName).Dispose();
                }
                using (StreamWriter sw = File.AppendText(LogFileName)) {
                    sw.WriteLine("===========Start============= " + DateTime.Now);
                    sw.WriteLine("Error Type: " + ex.GetType());
                    sw.WriteLine("Error Message: " + ex.Message);
                    sw.WriteLine("Stack Trace: " + ex.StackTrace);
                    sw.WriteLine("===========End============= " + DateTime.Now);
                }
            }

            catch (Exception e) {
                Console.Error.Write(e.ToString());
            }
        }
    }
}