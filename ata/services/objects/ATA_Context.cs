
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public class ATA_Context : DbContext
    {
        //User
        public DbSet<User> Users { get; set; }

        //Car Team
        public DbSet<Team> Teams { get; set; }

        //Car Class Type
        public DbSet<Class> Classes { get; set; }

        //Car Fuel Type
        public DbSet<Fuel> Fuels { get; set; }
        
        //Cars
        public DbSet<Car> Cars {get; set;}

        //Event Type (Dynamic, Static,..)
        public DbSet<EventType> EventTypes { get; set; }
        
        //Event Name (Acceleration, Design)
        public DbSet<EventName> EventNames { get; set; }
        
        //Events
        public DbSet<Event> Events { get; set; }

        //Examiner
        public DbSet<Examiner> Examiners { get; set; }

        //Examboard
        public DbSet<ExamBoard> ExamBoards {get; set;}

        //Scores    
        public DbSet<Score> Scores {get; set;}

        public DbSet<ScoreDesign1E> ScoresDesign1E { get; set; }
        public DbSet<ScoreDesign1C3> ScoresDesign1C3 { get; set; }

        public DbSet<ScorePresentation> ScoresPresentation { get; set; }

        public DbSet<ScoreCost> ScoresCost { get; set; }

        public DbSet<ScoreAcceleration> ScoresAcceleration { get; set; }
        public DbSet<ScoreSkidPad> ScoresSkidPad { get; set; }

        public DbSet<ScoreAutoCross> ScoresAutoCross { get; set; }

        public DbSet<ScoreEndurance> ScoresEndurance{ get; set; }

        public DbSet<Settings> Settings { get; set; }

        public DbSet<Penalties> Penalties { get; set; }

        public DbSet<ScoreCost_2015> ScoresCost_2015 { get; set; }

        public ATA_Context() : base("ATA_ConnectionString") 
        {}

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer<ATA_Context>(null);
            base.OnModelCreating(modelBuilder);
        }

    }
}