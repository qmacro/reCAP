'use strict';

var nav = new Vue({
  el: '#nav',
  data() {
    return {

    };
  },
});

var header = new Vue({
  el: '#header',
  data() {
    return {
      isCalendarsVisible: false
    };
  },
  mounted() {
    console.log(this.createCalendars());
  },
  methods: {
    toggleCalendars() {
      this.isCalendarsVisible = !this.isCalendarsVisible;
    },
    createCalendars() {

      let newStartTime = "2025-07-09T00:00:00.000";
      let newEndTime = "2025-07-10T00:00:00.000";

      let calendarStartDate = new Date(newStartTime).toISOString().replace(/-|:|\.\d+/g, '');
      let calendarEndDate = new Date(newEndTime).toISOString().replace(/-|:|\.\d+/g, '');

      let officeStartDate = new Date(newStartTime).toISOString();
      let officeEndDate = new Date(newEndTime).toISOString();

      const forbiddenCharacters = new RegExp('#', 'g')
        const removeForbiddenCharachters = (text) => {
            if (typeof text === 'string') {
              let formattedText = text.replace(/(&amp;|&)/g, " and ");
              return formattedText.replace(forbiddenCharacters, '');
            }
            return ''
        }

        const removeForbiddenCharachtersOutlook = (text) => {
          if (typeof text === 'string') {
            let formattedText = text.replace(/(?:\r\n|\r|\n)/g, "\\n");
            return formattedText.replace(forbiddenCharacters, '');
          }
          return ''
      }

      let description =
        "Join the awesome developer conference all around the SAP Cloud Application Programming Model (CAP). The time of the year where our vivid communities, customers, and partners meet the CAP Product Team and exchange best practices, technical concepts, current projects, ideas for the future, and way more.\n\nFind more information here: https://recap-conf.dev/\n(Links to live streams and recordings will be available there)\n\nImportant Dates:\nCall for Content: until March 10, 2025\nRegistration for Onsite Attendees: Opens on April 10, 2025\nEarly Bird Ticket Application: Ends March 10, 2025\nGet in contact with us in case of further questions: recap.conf@gmail.com.\n\nYour re>≡CAP orga team";

      let descriptionOffice = `Join the awesome developer conference all around the SAP Cloud Application Programming Model (CAP). The time of the year where our vivid communities, customers, and partners meet the CAP Product Team and exchange best practices, technical concepts, current projects, ideas for the future, and way more… 
      <br><br>Find more information here: https://recap-conf.dev/  
      <br>(Links to live streams and recordings will be available there)
      <br><br> Important Dates: <br> Call for Content: until March 10, 2025 <br> Registration for Onsite Attendees: Opens on April 10, 2025 <br> Early Bird Ticket Application: Ends March 10, 2025 <br><br>Get in contact with us in case of further questions: recap.conf@gmail.com.<br><br> Your re>≡CAP orga team`;

      let descriptionGoogle = `<br>Join the awesome developer conference all around the SAP Cloud Application Programming Model (CAP). The time of the year where our vivid communities, customers, and partners meet the CAP Product Team and exchange best practices, technical concepts, current projects, ideas for the future, and way more…
      <br><br>Find more information here: https://recap-conf.dev/  
      <br>(Links to live streams and recordings will be available there) 
      <br><br>Important Dates:<br>Call for Content: until March 10, 2025<br>Registration for Onsite Attendees: Opens on April 10, 2025<br>Early Bird Ticket Application: Ends March 10, 2025<br><br>Get in contact with us in case of further questions: <a href="mailto:recap.conf@gmail.com">recap.conf@gmail.com</a>.<br><br>Your re>≡CAP orga team`;

      let cal = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        'DTSTART:' + calendarStartDate,
        'DTEND:' + calendarEndDate,
        'SUMMARY:' + 'Save the Date: reCAP 2025',
        'LOCATION:' + 'SAP SE (ROT03), SAP-Allee 27, 68789 St. Leon-Rot (Germany)',
        'DESCRIPTION:' + removeForbiddenCharachtersOutlook(description),
        'UID:' + '1',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\n');

      return {
        calendars: [
          {
            google: encodeURI([
              'https://www.google.com/calendar/render',
              '?action=TEMPLATE',
              '&text=' + 'Save the Date: reCAP 2025',
              '&dates=' + calendarStartDate ,
              '/' + calendarEndDate,
              '&location='+'SAP SE (ROT03), SAP-Allee 27, 68789 St. Leon-Rot (Germany)',
              '&details=' + removeForbiddenCharachters(descriptionGoogle),
              '&sprop=&sprop=name:'
            ].join('')),
            office365: encodeURI([
              'https://outlook.office365.com/owa/',
              '?path=/calendar/action/compose',
              '&rru=addevent',
              '&subject=' + 'Save the Date: reCAP 2025',
              '&startdt=' + officeStartDate,
              '&enddt=' + officeEndDate,
              '&location=' + 'SAP SE (ROT03), SAP-Allee 27, 68789 St. Leon-Rot (Germany)',
              '&body=' + removeForbiddenCharachters(descriptionOffice)
            ].join('')),
            ics: encodeURI('data:text/calendar;charset=utf8,' + cal)
          }
        ]
      }
    },
  }
});

var main = new Vue({
  el: '#main',
  data() {
   return {
     team: [
       {
         name: "Margot Wollny",
         location: "Walldorf",
         image: "images/committee/margot-wollny.png",
       },
       {
         name: "Fabian Tempel",
         location: "Potsdam",
         image: "images/committee/margot-wollny.png",
       },
       {
         name: "Inna Atanasova",
         location: "Montreal",
         image: "images/committee/margot-wollny.png",
       },
     ],
     committee: [
       {
         name: "Daniel Hutzel",
         role: "CPO CAP",
         image: "images/committee/daniel-hutzel.jpg",
       },
       {
         name: "Ole Lilienthal",
         role: "Unit Lead CAP",
         image: "images/committee/ole-lilienthal.jpg",
       },
       {
         name: "DJ Adams",
         role: "Developer Advocate",
         image: "images/committee/dj-adams.jpg",
       },
       {
         name: "Volker Buzek",
         role: "Camunda, SAP Mentor",
         image: "images/committee/volker-buzek.jpg",
       },
       {
         name: "Gregor Wolf",
         role: "Computerservice Wolf, SAP Mentor",
         image: "images/committee/gregor-wolf.webp",
       },
       {
         name: "Martin Stenzig",
         role: "alphaOak",
         image: "images/committee/martin-stenzig.jpg",
       },
       {
         name: "Sebastian Schmidt ",
         role: "Manager CAP",
         image: "images/committee/sebastian-schmidt.jpg",
       },
     ],
   };
  }
});

var footer = new Vue({
  el: '#footer',
  data() {
    return {

    };
  },
});

