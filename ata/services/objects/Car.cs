using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace ATA.services
{
    public class Car
    {
        private DateTime deliveryDocDate;

        public int Id { get; set; }
        public int Carno { get; set; }
        public int Regno { get; set; }
        public virtual Team Team { get; set; }
        public virtual Class Class { get; set; }
        public virtual Fuel Fuel { get; set; }

        public DateTime DeliveryDocDate
        {
            get {
                //string temp = Convert.ToString(deliveryDocDate);
                //DateTime dt1 =  DateTime.Parse(temp);
                //DateTime dt2 = DateTime.Parse(temp, CultureInfo.InvariantCulture);
                //DateTime dt3 = DateTime.ParseExact(temp, "yyyy-mm-dd", CultureInfo.InvariantCulture);
                return DateTime.Parse(Convert.ToString(deliveryDocDate));
            }
            set { deliveryDocDate = value; }
        }
        
        public int BoxNo { get; set; }

        [NotMapped]
        public bool ReadOnly { get; set; }
        [NotMapped]
        public bool AlreadyAssigned { get; set; }

        [NotMapped]
        //Electric Car has to be green-colored - req.Ciadamidaro Set 2015
        public bool IsAnElectricCar
        {
            get { return (this.Fuel.Name.ToUpper().Contains("ELECTRI")); }
        }

        public virtual List<ExamBoard> ExamBoards { get; set; }

        //Car can be deleted if no score records found - added Scores reference
        public virtual List<Score> Scores { get; set; }

        public Car() {
            this.DeliveryDocDate = DateTime.Now.AddDays(10);
        }
    }
}