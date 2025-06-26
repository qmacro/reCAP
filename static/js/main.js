'use strict';

var nav = new Vue({
  el: "#nav",
  data() {
    return {
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  computed: {
    showMobileNav: function () {
      if (this.windowWidth < 780) {
        return true;
      } else {
        return false;
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    },
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
  el: "#main",
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
          name: "Mariana Naboka",
          role: "Fiori Elements & Tools Expert",
          image: "images/committee/mariana-naboka.png",
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
          name: "Marian Zeis",
          role: "Independent SAP Consultant & Developer",
          image: "images/committee/marian-zeis.jpg",
        },
        {
          name: "Wouter Lemaire",
          role: "SAP Solution Architect, Developer & Mentor",
          image: "images/committee/wouter-lemaire.jpg",
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
      activeSpeakers: null,
      lastFocussedElementID: "",
      speakers: [],
      filter: "all",
      activeSpeakers: null,
      lineup: [],
      proposalLineup: [],
      formattedLineup: [],
      formattedSpeakers: [],
      expertCornerLineup: {},
      expertCornerLineupUnsorted: [],
    };
  },
  mounted() {
    Promise.all([
      axios.get(
        "https://recap.cfapps.eu12.hana.ondemand.com/api/speaker/lineup"
      ),
      axios.get(
        "https://recap.cfapps.eu12.hana.ondemand.com/api/proposal/lineup"
      ),
    ]).then(([speakersResponse, lineupResponse]) => {
      this.speakers = speakersResponse.data;
      this.lineup = lineupResponse;
      this.formattedLineup = this.formatLineup();

      this.formattedSpeakers = this.formatSpeakers(
        this.formattedLineup,
        this.speakers
      );
      this.groupExpertCornerTopics();
    });

    this.updateLiveSession();

    let interval;

    let timeNow = new Date().toISOString();

    const startCounterTime = new Date(
      "2025-07-09T00:50:00.000+02:00"
    ).toISOString();

    const endCounterTime = new Date(
      "2025-07-09T18:10:00.000+02:00"
    ).toISOString();

    if (timeNow > startCounterTime && timeNow <= endCounterTime) {
      interval = setInterval(() => {
        timeNow = new Date().toISOString();
        if (timeNow > endCounterTime) {
          clearInterval(interval);
          return;
        }
        this.updateLiveSession();
      }, 30000);
    }
  },
  methods: {
    openSpeakerInfoModal(speakers, id) {
      this.activeSpeakers = speakers;
      this.$refs.agenda.ariaHidden = true;
      this.$refs.speakerModal.ariaHidden = false;
      this.$refs.speakerModal.style.display = "flex";
      this.lastFocussedElementID = id;

      setTimeout(() => {
        this.$refs.speakerModal.focus();
      }, 0);
    },
    closeSpeakerInfoModal() {
      this.activeSpeakers = null;
      this.$refs.agenda.ariaHidden = false;
      this.$refs.speakerModal.ariaHidden = true;
      this.$refs.speakerModal.style.display = "none";

      for (const key in this.$refs) {
        if (
          key.startsWith("twitter") ||
          key.startsWith("github") ||
          key.startsWith("linkedin") ||
          key.startsWith("mastodon") ||
          key.startsWith("bluesky")
        ) {
          delete this.$refs[key];
        }
      }
      document.getElementById(this.lastFocussedElementID).focus();
    },
    focusTrapModal($event) {
      let focussableElements = [];
      focussableElements.push(this.$refs.close);

      for (const key in this.$refs) {
        if (
          key.startsWith("twitter") ||
          key.startsWith("github") ||
          key.startsWith("linkedin") ||
          key.startsWith("mastodon") ||
          key.startsWith("bluesky")
        ) {
          const element = this.$refs[key];
          if (Array.isArray(element)) {
            focussableElements.push(element[0]);
          } else {
            focussableElements.push(element);
          }
        }
      }

      const filteredFocussableElements = focussableElements.filter(
        (el) => el !== undefined
      );
      const activeElementIndex = filteredFocussableElements.indexOf(
        $event.target
      );

      if (activeElementIndex != filteredFocussableElements.length - 1) {
        if ($event.shiftKey) {
          if (activeElementIndex === 0) {
            filteredFocussableElements[
              filteredFocussableElements.length - 1
            ].focus();
          } else {
            filteredFocussableElements[activeElementIndex - 1].focus();
          }
        } else {
          filteredFocussableElements[activeElementIndex + 1].focus();
        }
      } else {
        if ($event.shiftKey) {
          filteredFocussableElements[activeElementIndex - 1].focus();
        } else {
          filteredFocussableElements[0].focus();
        }
      }
    },
    formatTwitterLink(handle) {
      if (!handle.startsWith("https:")) {
        return "https://twitter.com/" + handle;
      }
    },
    formatLinkedInLink(handle) {
      if (!handle.startsWith("https:")) {
        return "https://www.linkedin.com/in/" + handle;
      }
    },
    formatMastodonLink(handle) {
      if (!handle.startsWith("https:")) {
        if (handle.includes("@saptodon.org")) {
          return "https://saptodon.org/" + handle.replace("@saptodon.org", "");
        }

        return "https://saptodon.org/" + handle;
      }
    },
    formatBlueskyLink(handle) {
      if (!handle.startsWith("https:")) {
        return "https://bsky.app/profile/" + handle.replace("@", "");
      }
    },
    shuffleSpeakersArray(array) {
      const newArray = [...array];
      const filteredArray = newArray.filter((el) => el.hasPhoto);
      const length = filteredArray.length;

      for (let start = 0; start < length; start++) {
        const randomPosition = Math.floor(
          (filteredArray.length - start) * Math.random()
        );
        const randomItem = filteredArray.splice(randomPosition, 1);
        filteredArray.push(...randomItem);
      }

      return filteredArray;
    },
    formatAndShuffleSpeakersArray(array) {
      const formattedArray = this.formatSpeakersArray(array);
      return this.shuffleSpeakersArray(formattedArray);
    },
    formatSpeakersArray(array) {
      const newArray = [...array];
      const formattedArray = newArray.map((speaker) => {
        const fullName = speaker.firstName + " " + speaker.lastName;

        if (speaker.twitterHandle) {
          speaker.twitterHandle = this.formatTwitterLink(speaker.twitterHandle);
        }

        if (speaker.linkedInUrl) {
          speaker.linkedInUrl = this.formatLinkedInLink(speaker.linkedInUrl);
        }

        if (speaker.mastodonHandle) {
          speaker.mastodonHandle = this.formatMastodonLink(
            speaker.mastodonHandle
          );
        }

        if (speaker.blueskyHandle) {
          speaker.blueskyHandle = this.formatBlueskyLink(speaker.blueskyHandle);
        }

        return {
          ...speaker,
          fullName: fullName,
          showMore: false,
        };
      });

      return formattedArray;
    },
    onFilterChange($event) {
      this.filter = $event.target.value;
      this.formattedLineup = this.formatLineup();
    },
    formatLineup() {
      const tempLineUp = this.lineup.data.map((session) => {
        session.speakers.map((speaker) => {
          if (speaker.twitterHandle) {
            speaker.twitterHandle = this.formatTwitterLink(
              speaker.twitterHandle
            );
          }

          if (speaker.linkedInUrl) {
            speaker.linkedInUrl = this.formatLinkedInLink(speaker.linkedInUrl);
          }

          if (speaker.mastodonHandle) {
            speaker.mastodonHandle = this.formatMastodonLink(
              speaker.mastodonHandle
            );
          }

          if (speaker.blueskyHandle) {
            speaker.blueskyHandle = this.formatBlueskyLink(
              speaker.blueskyHandle
            );
          }
        });

        let start = session.startTime;
        let end = session.endTime;

        if (
          session.location === "canteen" &&
          session.title.toLowerCase().includes("breakfast")
        ) {
          start = "08:00";
        }

        let tempStart = start.substring(0, start.indexOf(":"));
        let tempEnd = end.substring(0, end.indexOf(":"));

        if (tempStart.length == 1 && !tempStart.startsWith("0")) {
          start = "0" + start;
        }

        if (tempEnd.length == 1 && !tempEnd.startsWith("0")) {
          end = "0" + end;
        }

        let newStartTime = "2025-07-09T" + start + ":00.000+02:00";
        let newEndTime = "2025-07-09T" + end + ":00.000+02:00";

        let calendarStartDate = new Date(newStartTime)
          .toISOString()
          .replace(/-|:|\.\d+/g, "");
        let calendarEndDate = new Date(newEndTime)
          .toISOString()
          .replace(/-|:|\.\d+/g, "");

        let officeStartDate = new Date(newStartTime).toISOString();
        let officeEndDate = new Date(newEndTime).toISOString();

        const forbiddenCharacters = new RegExp("#", "g");
        const removeForbiddenCharachters = (text) => {
          if (typeof text === "string") {
            let formattedText = text.replace(/(&amp;|&)/g, " and ");
            return formattedText.replace(forbiddenCharacters, "");
          }
          return "";
        };

        const removeForbiddenCharachtersOutlook = (text) => {
          if (typeof text === "string") {
            let formattedText = text.replace(/(?:\r\n|\r|\n)/g, "\\n");
            formattedText = formattedText.replace(/<br>/g, "\\n");
            formattedText = formattedText.replace(/(&amp;|&)/g, " and ");
            return formattedText.replace(forbiddenCharacters, "");
          }
          return "";
        };
        const sessionLocation = (location) => {
          if (location.toLowerCase().includes("audimax")) {
            return "Yellow Room";
          } else if (
            location.toLowerCase().includes("w1") ||
            location.toLowerCase().includes("w2")
          ) {
            return "Blue Room";
          } else if (location.toLowerCase().includes("w3")) {
            return "Orange Room";
          } else {
            return location;
          }
        };

        let cal = [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "BEGIN:VEVENT",
          "DTSTART:" + calendarStartDate,
          "DTEND:" + calendarEndDate,
          "SUMMARY:" +
            "reCAP: " +
            removeForbiddenCharachtersOutlook(session.title),
          "LOCATION:" + sessionLocation(session.location),
          "DESCRIPTION:" +
            removeForbiddenCharachtersOutlook(session.description),
          "UID:" + session.id,
          "END:VEVENT",
          "END:VCALENDAR",
        ].join("\n");

        let calDescription = "";

        if (session.description) {
          let formattedDescription = session.description.replace(/&amp;/g, "&");
          calDescription = formattedDescription.replace(
            /(?:\r\n|\r|\n)/g,
            "<br>"
          );
        }

        let timeNow = new Date().toISOString();
        let sessionTimeStart = new Date(newStartTime).toISOString();
        let sessionTimeEnd = new Date(newEndTime).toISOString();
        let sessionLiveStatus = false;

        if (timeNow > sessionTimeStart && timeNow < sessionTimeEnd) {
          sessionLiveStatus = true;
        }

        return {
          ...session,
          startTime: newStartTime,
          endTime: newEndTime,
          isLive: sessionLiveStatus,
          calendars: [
            {
              google: encodeURI(
                [
                  "https://www.google.com/calendar/render",
                  "?action=TEMPLATE",
                  "&text=" +
                    "reCAP: " +
                    removeForbiddenCharachters(session.title),
                  "&dates=" + calendarStartDate,
                  "/" + calendarEndDate,
                  "&location=" + sessionLocation(session.location),
                  "&details=" + removeForbiddenCharachters(calDescription),
                  "&sprop=&sprop=name:",
                ].join("")
              ),
              office365: encodeURI(
                [
                  "https://outlook.office365.com/owa/",
                  "?path=/calendar/action/compose",
                  "&rru=addevent",
                  "&subject=" +
                    "reCAP: " +
                    removeForbiddenCharachters(session.title),
                  "&startdt=" + officeStartDate,
                  "&enddt=" + officeEndDate,
                  "&location=" + sessionLocation(session.location),
                  "&body=" + removeForbiddenCharachters(calDescription),
                ].join("")
              ),
              ics: encodeURI("data:text/calendar;charset=utf8," + cal),
            },
          ],
        };
      });

      const sortedScheduleTemp = tempLineUp.sort(
        (a, b) =>
          luxon.DateTime.fromISO(a.startTime) -
          luxon.DateTime.fromISO(b.startTime)
      );

      this.expertCornerLineupUnsorted = sortedScheduleTemp.filter((schedule) =>
        schedule.location.includes("expert")
      );

      const sortedSchedule = sortedScheduleTemp.filter(
        (schedule) => !schedule.type.includes("expert")
      );

      if (this.filter === "all") {
        return sortedSchedule;
      } else if (this.filter === "talks") {
        return sortedSchedule.filter((schedule) =>
          schedule.type.includes("presentation")
        );
      } else if (this.filter === "workshops") {
        return sortedSchedule.filter(
          (schedule) =>
            schedule.type.includes("hands") ||
            schedule.type.includes("workshop")
        );
      } else if (this.filter === "audimax") {
        return sortedSchedule.filter(
          (schedule) => schedule.location.toLowerCase() === "audimax"
        );
      } else if (this.filter === "w1") {
        return sortedSchedule.filter((schedule) =>
          schedule.location.toLowerCase().includes("w1")
        );
      } else if (this.filter === "w3") {
        return sortedSchedule.filter((schedule) =>
          schedule.location.toLowerCase().includes("w3")
        );
      } else if (this.filter === "beginner") {
        return sortedSchedule.filter(
          (schedule) => schedule.proficiencyLevel === "beginner"
        );
      } else if (this.filter === "intermediate") {
        return sortedSchedule.filter(
          (schedule) => schedule.proficiencyLevel === "intermediate"
        );
      } else if (this.filter === "advanced") {
        return sortedSchedule.filter(
          (schedule) => schedule.proficiencyLevel === "advanced"
        );
      } else {
        return sortedSchedule;
      }
    },
    formatSpeakers(talks, speakers) {
      // Create a lookup map from talk ID to location
      const talkIdToRoomMap = new Map(
        talks.map((talk) => [talk.id, talk.location])
      );

      // Loop through speakers and their proposals to enrich with location
      speakers.forEach((speaker) => {
        speaker.proposals.forEach((proposal) => {
          const location = talkIdToRoomMap.get(proposal.id);
          if (location) {
            proposal.location = location;
          } else {
            proposal.location = "Audimax";
          }
        });
      });

      return speakers;
    },
    groupExpertCornerTopics() {
      this.expertCornerLineupUnsorted.forEach((corner) => {
        const key = `${corner.startTime}|${corner.endTime}`;
        if (!this.expertCornerLineup[key]) {
          this.expertCornerLineup[key] = [];
        }
        this.expertCornerLineup[key].push(corner);
      });
    },
    formatProficiencyLevel(value) {
      if (!value) return "";
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    formatLocationTitle(value) {
      if (!value) return "";

      if (value) {
        if (value.toLowerCase().includes("audimax")) {
          return "Yellow";
        } else if (
          value.toLowerCase().includes("w1") ||
          value.toLowerCase().includes("w2")
        ) {
          return "Blue";
        } else if (value.toLowerCase().includes("w3")) {
          return "Orange";
        } else if (value.toLowerCase().includes("expert")) {
          return "Experts Corner";
        } else if (
          value.toLowerCase().includes("canteen") ||
          value.toLowerCase().includes("catering")
        ) {
          return "Canteen";
        } else {
          return value;
        }
      }
    },
    showSessionCalendars(session) {
      if (
        (session.location.toLowerCase().includes("audimax") ||
          session.location.toLowerCase().includes("w1") ||
          session.location.toLowerCase().includes("w2") ||
          session.location.toLowerCase().includes("w3")) &&
        !(
          session.title.toLowerCase().includes("welcome") ||
          session.title.toLowerCase().includes("closing")
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    decodeBioHtml(value) {
      if (!value) return "";

      const txt = document.createElement("textarea");
      txt.innerHTML = value;

      let decoded = txt.value;
      decoded = decoded.replace(/&amp;|&/g, " and ");
      decoded = decoded.replace(/\\n|\/n|\n/g, "<br>");

      return decoded;
    },
    updateLiveSession() {
      return this.formattedLineup.map((session) => {
        let timeNow = new Date().toISOString();
        let sessionTimeStart = new Date(session.startTime).toISOString();
        let sessionTimeEnd = new Date(session.endTime).toISOString();

        if (timeNow >= sessionTimeStart && timeNow < sessionTimeEnd) {
          session.isLive = true;
        } else {
          session.isLive = false;
        }
      });
    },
  },
  filters: {
    formatLocation: function (value) {
      if (value) {
        if (value.toLowerCase().includes("audimax")) {
          return "Y";
        } else if (
          value.toLowerCase().includes("w1") ||
          value.toLowerCase().includes("w2")
        ) {
          return "B";
        } else if (value.toLowerCase().includes("w3")) {
          return "O";
        } else if (value.toLowerCase().includes("expert")) {
          return "EXP";
        } else if (
          value.toLowerCase().includes("canteen") ||
          value.toLowerCase().includes("catering")
        ) {
          return "CA";
        } else {
          return value;
        }
      }
    },
    formatLevel: function (value) {
      if (!value) return "";
      return value.charAt(0).toUpperCase();
    },
    trimTime: function (value) {
      let time = value.substring(value.indexOf("T") + 1);
      let timeSplit = time.split(":");
      let hour = timeSplit[0].startsWith("0")
        ? timeSplit[0].replace(/^0+/, "")
        : timeSplit[0];
      return hour + ":" + timeSplit[1];
    },
    trimExpertText: function (value) {
      return value.replace(/^Expert Corner: /, "");
    },
    convertTime: function (value, eventTime) {
      if (eventTime === "local") {
        return luxon.DateTime.fromISO(value)
          .toLocal()
          .toISO({ suppressMilliseconds: true });
      }
      return value;
    },
    decodeHtml: function (value) {
      if (!value) return "";
      const txt = document.createElement("textarea");
      txt.innerHTML = value;
      return txt.value;
    },
  },
});

var footer = new Vue({
  el: '#footer',
  data() {
    return {

    };
  },
});

