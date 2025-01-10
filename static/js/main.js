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
    // console.log(this.createCalendars());
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



      let description = "Join us for UI5con 2025, the community event organized by the developers of the OpenUI5 framework. This event brings together the UI5 community to meet, learn from each other, and have fun. The event will take place on July 9, 2025, in SAP-Allee 27, St.Leon-Rot, Germany. For those unable to attend in person, parts of the event will be live-streamed on the UI5 YouTube channel, allowing everyone to participate and engage with the community. \n\nEvent Details: \nDate: July 9, 2025 \nLocation: SAP-Allee 27, St.Leon-Rot \nLive Stream: https://www.youtube.com/user/openui5videos \nWebsite: https://openui5.org/ui5con/germany2025/\n\nImportant Dates:\nCall for Content: January 23, 2025 - March 10, 2025\nRegistration for Onsite Attendees: Opens on April 10, 2025\nEarly Bird Ticket Application: Ends March 10, 2025\n\nVisit our event page at https://openui5.org/ui5con for more information and stay tuned for updates. If you have any further questions, please don't hesitate to contact us at openui5@sap.com.\n\nWe look forward to seeing you at UI5con 2025!"

      let descriptionOffice = `Join us for UI5con 2025, the community event organized by the developers of the OpenUI5 framework. This event brings together the UI5 community to meet, learn from each other, and have fun. The event will take place on July 9, 2025, in SAP-Allee 27, St.Leon-Rot, Germany. For those unable to attend in person, parts of the event will be live-streamed on the UI5 YouTube channel, allowing everyone to participate and engage with the community. <br><br> Event Details: <br> Date: July 9, 2025 <br> Location: SAP-Allee 27, St.Leon-Rot <br> Live Stream: https://www.youtube.com/user/openui5videos <br> Website: https://openui5.org/ui5con/germany2025/ <br><br> Important Dates: <br> Call for Content: January 23, 2025 - March 10, 2025 <br> Registration for Onsite Attendees: Opens on April 10, 2025 <br> Early Bird Ticket Application: Ends March 10, 2025 <br><br> Visit our event page at https://openui5.org/ui5con for more information and stay tuned for updates. If you have any further questions, please don't hesitate to contact us at openui5@sap.com.<br><br> We look forward to seeing you at UI5con 2025!`

      let descriptionGoogle = `<br>Join us for UI5con 2025, the community event organized by the developers of the OpenUI5 framework. This event brings together the UI5 community to meet, learn from each other, and have fun. The event will take place on July 9, 2025, in SAP-Allee 27, St.Leon-Rot, Germany. For those unable to attend in person, parts of the event will be live-streamed on the UI5 YouTube channel, allowing everyone to participate and engage with the community. <br><br>Event Details: <br>Date: July 9, 2025 <br>Location: SAP-Allee 27, St.Leon-Rot <br>Live Stream: <a href="https://www.youtube.com/user/openui5videos" target="_blank">https://www.youtube.com/user/openui5videos</a> <br>Website: <a href="https://openui5.org/ui5con/germany2025/" target="_blank">https://openui5.org/ui5con/germany2025/</a><br><br>Important Dates:<br>Call for Content: January 23, 2025 - March 10, 2025<br>Registration for Onsite Attendees: Opens on April 10, 2025<br>Early Bird Ticket Application: Ends March 10, 2025<br><br>Visit our event page at <a href="https://openui5.org/ui5con" target="_blank">https://openui5.org/ui5con</a> for more information and stay tuned for updates. If you have any further questions, please don't hesitate to contact us at <a href="mailto:openui5@sap.com">openui5@sap.com</a>.<br><br>We look forward to seeing you at UI5con 2025!`

      let cal = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        'DTSTART:' + calendarStartDate,
        'DTEND:' + calendarEndDate,
        'SUMMARY:' + 'Save the Date: UI5con 2025',
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
              '&text=' + 'Save the Date: UI5con 2025',
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
              '&subject=' + 'Save the Date: UI5con 2025',
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

