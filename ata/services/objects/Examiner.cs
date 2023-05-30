using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;

namespace ATA.services
{
    public class Examiner
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Phone { get; set; }

        [NotMapped]
        public bool ReadOnly { get; set; }
        [NotMapped]
        public bool AlreadyAssigned { get; set; }

        public virtual List<ExamBoard> ExamBoards { get; set; }

        public Examiner(){}
    }
}