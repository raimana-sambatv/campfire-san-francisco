// TODO: For meetings starting in less than 5 minutes, prevent booking a room

/**------------------------------------------------------------------------------------------------
 * Constants
 ------------------------------------------------------------------------------------------------*/

// used when initializing with gapi.client.init()
const initInfo = {
  clientId:
    '753749535184-k5uotv925ajnqo3tg92fke9a1fb38bla.apps.googleusercontent.com',
  apiKey: 'AIzaSyAT7cQ9O8p2IV6qFB-8RyihgddIvK6ZEwo',
  discoveryDocs: [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  ],
  scopes: 'https://www.googleapis.com/auth/calendar'
};

// used to access conference room info
const conferenceRooms = [
  {
    roomNumber: '1',
    displayName: "Schitt's Creek",
    calendarId: 'samba.tv_188196ud20s9uh5nl2mksmmnsjot0@resource.calendar.google.com'
  },
  {
    roomNumber: '2',
    displayName: 'The Good Place',
    calendarId: 'samba.tv_1886fuqhefpnmi4pkoctfdi3p5a82@resource.calendar.google.com'
  },
  {
    roomNumber: '3',
    displayName: 'The 99th Precinct',
    calendarId: 'samba.tv_188agd0pupqamgn2lq6ejcdhmhvue@resource.calendar.google.com'
  },
  {
    roomNumber: '4',
    displayName: "JJ's Diner",
    calendarId: 'samba.tv_18818e30gggc6jhnihllp3sk1oi5k@resource.calendar.google.com'
  },
  {
    roomNumber: '5',
    displayName: 'Dunder Mifflin',
    calendarId: 'samba.tv_188abcq5872heiodh07kuoe734a5a@resource.calendar.google.com'
  },
  {
    roomNumber: '6',
    displayName: "Aziraphale's Bookshop",
    calendarId: 'samba.tv_188222bciecushevk33oq2rt6vsai@resource.calendar.google.com'
  },
  {
    roomNumber: '7',
    displayName: 'Plinko',
    calendarId: 'samba.tv_1881abf6n0ivqhfhnalkjdgkcqa3e@resource.calendar.google.com'
  },
  {
    roomNumber: '8',
    displayName: 'The Magic Box',
    calendarId: 'samba.tv_18824027od0q0j7mkb7mjnpcoah7e@resource.calendar.google.com'
  },
  {
    roomNumber: '9',
    displayName: "Bates Motel",
    calendarId: 'samba.tv_1887jtf3nhepsjaoi1q7osdjchukm@resource.calendar.google.com'
  },
  {
    roomNumber: '10',
    displayName: 'Anavrin',
    calendarId: 'samba.tv_1881808u0bsroj43ise76kt2slm1m@resource.calendar.google.com'
  },
  {
    roomNumber: '11',
    displayName: "King’s Landing",
    calendarId: 'samba.tv_188btrmjlo4quh0gkgee52f08j384@resource.calendar.google.com'
  },
  {
    roomNumber: '12',
    displayName: 'Vought International',
    calendarId: 'samba.tv_188ffijmnitb0hr2jc32644ulaupe@resource.calendar.google.com'
  },
  {
    roomNumber: '13',
    displayName: 'Chateau Picard',
    calendarId: 'samba.tv_1884rqsdue7doi9uihe2kou34ko3i@resource.calendar.google.com'
  },
  {
    roomNumber: '14',
    displayName: "Mandalore",
    calendarId: 'samba.tv_1886lc905c836i5shgnhlc23f0phm@resource.calendar.google.com'
  },
  {
    roomNumber: '15',
    displayName: 'Caprica',
    calendarId: 'samba.tv_1888stcflh8g0h12l4d23pvnjetqm@resource.calendar.google.com'
  },
  {
    roomNumber: '16',
    displayName: 'San Junipero',
    calendarId: 'samba.tv_1887skseuefaii8ti0r7bi0isckmm@resource.calendar.google.com'
  },
  {
    roomNumber: '17',
    displayName: 'The Summer Palace',
    calendarId: 'samba.tv_188cusogfhcpkiiei22ul34luc38i@resource.calendar.google.com'
  },
  {
    roomNumber: '18',
    displayName: 'Kobra Kai',
    calendarId: 'samba.tv_18822bs70i2lqiqmjvtss1tsod70u@resource.calendar.google.com'
  },
  {
    roomNumber: '19',
    displayName: 'The Regal Beagle',
    calendarId: 'samba.tv_188ebnelee63ijstjq7l4699uj7g2@resource.calendar.google.com'
  },
  {
    roomNumber: '20',
    displayName: "Mocha’s Joe",
    calendarId: 'samba.tv_1886j95otuieaje3hktt3i9jju2pe@resource.calendar.google.com'
  },
  {
    roomNumber: '21',
    displayName: "Monk’s Cafe",
    calendarId: 'samba.tv_188ckgcofe4s8g0pnvmi9aftqvua2@resource.calendar.google.com'
  },
  {
    roomNumber: '22',
    displayName: 'Hollywoo',
    calendarId: 'samba.tv_188153ig9ucbaigdjb6p7ib6fdqjq@resource.calendar.google.com'
  },
  {
    roomNumber: '23',
    displayName: "The Citadel of Rick’s",
    calendarId: 'samba.tv_188cmu84hb816j1aijj24tdj5s472@resource.calendar.google.com'
  },
  {
    roomNumber: '24',
    displayName: 'Gotham',
    calendarId: 'samba.tv_18875qsba743ognumsnujrrt01k32@resource.calendar.google.com'
  },
  {
    roomNumber: '25',
    displayName: 'Smallville',
    calendarId: 'samba.tv_1884io9otjl8kijki4uu055b44e8s@resource.calendar.google.com'
  },
  {
    roomNumber: '26',
    displayName: 'The Krusty Krab',
    calendarId: 'samba.tv_1885flss03tl4jrfkfs2vcuedg5mq@resource.calendar.google.com'
  },
  {
    roomNumber: '27',
    displayName: "Bob's Burgers",
    calendarId: 'samba.tv_188b8joflid0ui99ls01ko9o4bmtm@resource.calendar.google.com'
  },
  {
    roomNumber: '28',
    displayName: 'TARDIS',
    calendarId: 'samba.tv_1889k1qt497kmg15l8j5cgo0qto9q@resource.calendar.google.com'
  }
];

/**------------------------------------------------------------------------------------------------
 * Function Declarations
 -------------------------------------------------------------------------------------------------*/

// loads the auth2 library and API client library upon load
function loadLibraries() {
  gapi.load('client:auth2', clientLibrary);
}

// initializes API client library and sets up sign-in state listeners
function clientLibrary() {
  gapi.client
    .init({
      apiKey: initInfo.apiKey,
      clientId: initInfo.clientId,
      discoveryDocs: initInfo.discoveryDocs,
      scope: initInfo.scopes
    })
    .then(function () {
      // listen for sign in state changes
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      // handle the initial sign in state
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      signInButton.onclick = handleAuthClick;
      signOutButton.onclick = handleSignoutClick;
    });
}

// updates UI when signed in state changes and calls the API after sign-in
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    signInButton.style.display = 'none';
    signOutButton.style.display = 'block';
  } else {
    signInButton.style.display = 'block';
    signOutButton.style.display = 'none';
  }
}

// sign in user upon button click
function handleAuthClick() {
  gapi.auth2.getAuthInstance().signIn();
}

// sign out user upon button click
function handleSignoutClick() {
  gapi.auth2.getAuthInstance().signOut();
}

// get and return the current time to use when calling the Calendar API
function getCurrentTime() {
  const now = new Date();
  return now.toISOString();
}

// get and return the end of day time to use when calling the Calendar API
function getMidnightTime() {
  let midnight = new Date();
  midnight.setHours(23, 59, 59, 9999);
  return midnight.toISOString();
}

// Return only the data needed from the calendarEvent
function removeExtraneousInfo(calendarEvent) {
  return {
    summary: calendarEvent.summary || 'Busy',
    start: new Date(calendarEvent.start.dateTime),
    end: new Date(calendarEvent.end.dateTime)
  };
}

// perform the minimal check if an event should be included
function isNotCancelled(calendarEvent) {
  return calendarEvent.location || calendarEvent.visibility;
}

// used when there are no more meetings today
function clearNextMeetingInfo() {
  nextMeetingTime.innerText = 'No other meetings booked';
  nextMeeting.innerText = '';
}

// used if there are no meetings occuring in the next 5 minutes
function enableBooking() {
  currentStatus.classList.add('hidden');
  bookingButton.classList.remove('hidden');
}

function isThereCurrentlyAMeeting(firstCalendarEvent) {
  const now = new Date();
  return firstCalendarEvent.start < now;
}

function addMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function bookRoom() {
  const now = new Date();
  const endTime = addMinutesToDate(now, parseInt(bookTime.innerText));
  var event = {
    summary: 'Busy',
    start: {
      dateTime: `${now.toISOString()}`,
      timeZone: 'America/Los_Angeles'
    },
    description: 'Booked through the Campfire conference app',
    end: {
      dateTime: `${endTime.toISOString()}`,
      timeZone: 'America/Los_Angeles'
    },
    attendees: [
      {
        email: selectedRoom.calendarId,
        responseStatus: 'accepted'
      }
    ]
  };

  var request = gapi.client.calendar.events.insert({
    calendarId: 'primary',
    resource: event
  });

  request.execute(function (event) {
    console.log('Event created: ' + event.htmlLink);
  });
  bookTime.innerText = '5'
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed
 */
function listTodaysEvents() {
  gapi.client.calendar.events
    .list({
      calendarId: selectedRoom.calendarId,
      timeMin: getCurrentTime(),
      timeMax: getMidnightTime(),
      singleEvents: true,
      orderBy: 'startTime'
    })
    .then(function (response) {
      const allMeetingsToday = response.result.items;
      console.log(allMeetingsToday);

      const availableMeetingsToday = allMeetingsToday.filter(isNotCancelled);
      console.log(availableMeetingsToday);

      const formattedMeetingsToday = availableMeetingsToday.map(
        removeExtraneousInfo
      );
      console.log(formattedMeetingsToday);

      if (formattedMeetingsToday.length < 1) {
        bookedOrNot.classList.add('hidden');
        enableBooking();
        clearNextMeetingInfo();
        maxTimeToBook = 60;
        mainScreen.style.backgroundImage = `url('./images/${
          selectedRoom.roomNumber
          }.png')`;
      } else if (
        formattedMeetingsToday.length == 1 &&
        isThereCurrentlyAMeeting(formattedMeetingsToday[0])
      ) {
        bookedOrNot.classList.remove('hidden');
        currentStatus.classList.remove('hidden');
        bookingButton.classList.add('hidden');
        currentMeetingTime.innerText = getEventTime(formattedMeetingsToday[0]);
        currentMeeting.innerText = `${formattedMeetingsToday[0].summary}`;
        clearNextMeetingInfo();
        mainScreen.style.backgroundImage = `url('./images/${
          selectedRoom.roomNumber
          }-booked.png')`;
      } else if (
        formattedMeetingsToday.length == 1 &&
        !isThereCurrentlyAMeeting(formattedMeetingsToday[0])
      ) {
        bookedOrNot.classList.add('hidden');
        enableBooking();
        nextMeetingTime.innerText = getEventTime(formattedMeetingsToday[0]);
        nextMeeting.innerText = `${formattedMeetingsToday[0].summary}`;
        calculateMaxTimeToBook(formattedMeetingsToday[0]);
        mainScreen.style.backgroundImage = `url('./images/${
          selectedRoom.roomNumber
          }.png')`;
      } else if (isThereCurrentlyAMeeting(formattedMeetingsToday[0])) {
        bookedOrNot.classList.remove('hidden');
        currentStatus.classList.remove('hidden');
        bookingButton.classList.add('hidden');
        currentMeetingTime.innerText = getEventTime(formattedMeetingsToday[0]);
        currentMeeting.innerText = `${formattedMeetingsToday[0].summary}`;
        nextMeetingTime.innerText = getEventTime(formattedMeetingsToday[1]);
        nextMeeting.innerText = `${formattedMeetingsToday[1].summary}`;
        mainScreen.style.backgroundImage = `url('./images/${
          selectedRoom.roomNumber
          }-booked.png')`;
      } else {
        bookedOrNot.classList.add('hidden');
        enableBooking();
        nextMeeting.innerText = `${formattedMeetingsToday[0].summary}`;
        nextMeetingTime.innerText = getEventTime(formattedMeetingsToday[0]);
        calculateMaxTimeToBook(formattedMeetingsToday[0]);
        mainScreen.style.backgroundImage = `url('./images/${
          selectedRoom.roomNumber
          }.png')`;
      }
    });
}

/**
 * Code below is for handling different swipe directions
 *
 */
function getSwipePosition(event) {
  initialX = event.touches[0].clientX;
  initialY = event.touches[0].clientY;
}

function swipedHorizontally(currentX, currentY) {
  const horizontalDifference = currentX - initialX;
  const verticalDifference = currentY - initialY;

  if (Math.abs(horizontalDifference) > Math.abs(verticalDifference)) {
    return true;
  } else {
    return false;
  }
}

function getSwipeDirection(event) {
  if (initialX === null || initialY === null) {
    return;
  }

  const currentX = event.touches[0].clientX;
  const currentY = event.touches[0].clientY;

  if (swipedHorizontally(currentX, currentY)) {
    // // disabled until I can check that the availability screen doesn't exceed Google API query limits
    // if (currentX < initialX && event.target.id === 'main-screen') {
    //   // when the main screen is swiped left, show the availability modal
    //   availabilityModal.classList.toggle('hidden');
    // } else if (currentX > initialX && event.target.id === 'availability-modal') {
    //   // when the availability modal is swiped right, hide it
    //   availabilityModal.classList.toggle('hidden');
    // }
  } else {
    if (currentY < initialY && event.target.id === 'admin-modal') {
      // when the admin modal is swiped up, hide it
      adminModal.classList.toggle('hidden');
    } else if (currentY > initialY && event.target.id !== 'admin-modal') {
      // when any screen or modal is swiped down, other than the admin modal, show the admin modal
      adminModal.classList.toggle('hidden');
    }
  }

  initialX = null;
  initialY = null;
}

function toggleBookingModal() {
  bookingModal.classList.toggle('hidden');
}

function confirmBooking() {
  bookRoom();
  toggleBookingModal();
  bookedModal.classList.toggle('hidden');
  setTimeout(function () {
    listTodaysEvents();
    bookingButton.classList.add('hidden');
    currentStatus.classList.remove('hidden');
    bookedModal.classList.toggle('hidden');
  }, 3000);
}

function mainInterval() {
  intervalVar = setInterval(function () {
    listTodaysEvents();
  }, 60000);
}

function selectRoom() {
  selectedRoom = conferenceRooms[selectRoomMenu.selectedIndex - 1];
  roomName.innerText = selectedRoom.displayName;
  console.log(selectedRoom.displayName);
  clearInterval(intervalVar);
  listTodaysEvents();
  mainInterval();
}

function getEventTime(calendarEvent) {
  let eventMinutes = null;
  let eventHours = null;
  let amOrPm = null;

  if (calendarEvent.start.getMinutes() < 10) {
    eventMinutes = 0 + `${calendarEvent.start.getMinutes()}`;
  } else {
    eventMinutes = calendarEvent.start.getMinutes();
  }

  if (calendarEvent.start.getHours() > 12) {
    eventHours = calendarEvent.start.getHours() - 12;
    amOrPm = 'PM';
  } else if (calendarEvent.start.getHours() === 12) {
    eventHours = calendarEvent.start.getHours();
    amOrPm = 'PM';
  } else {
    eventHours = calendarEvent.start.getHours();
    amOrPm = 'AM';
  }
  return `${eventHours}:${eventMinutes} ${amOrPm}`;
}

function increment() {
  if (bookTime.innerText < 60 && bookTime.innerText < maxTimeToBook) {
    bookTime.innerText = `${parseInt(bookTime.innerText) + 5}`;
  }
}

function decrement() {
  if (bookTime.innerText > 5) {
    bookTime.innerText = `${parseInt(bookTime.innerText) - 5}`;
  }
}

function calculateMaxTimeToBook(nextCalendarEvent) {
  const now = new Date();
  const differenceInMinutes =
    (nextCalendarEvent.start.getTime() - now.getTime()) / 1000 / 60;
  maxTimeToBook = Math.floor(differenceInMinutes / 5) * 5;
  console.log(maxTimeToBook);
}

function idleLogout() {
  var t;
  window.onload = resetTimer;
  window.onmousemove = resetTimer;
  window.onmousedown = resetTimer;
  window.ontouchstart = resetTimer;
  window.onclick = resetTimer;
  window.onkeypress = resetTimer;
  window.addEventListener('scroll', resetTimer, true);
  function yourFunction() {
    bookingModal.classList.add('hidden');
    bookTime.innerText = '5'
  }
  function resetTimer() {
    clearTimeout(t);
    t = setTimeout(yourFunction, 30000);
  }
}
idleLogout();

/**------------------------------------------------------------------------------------------------
 * 
 ------------------------------------------------------------------------------------------------*/

onload = loadLibraries;

let initialX = null;
let initialY = null;

let selectedRoom = null;

let intervalVar = null;

let maxTimeToBook = null;
const minTimeToBook = 5;

const mainScreen = document.getElementById('main-screen');
const adminModal = document.getElementById('admin-modal');
const availabilityModal = document.getElementById('availability-modal');
const bookingModal = document.getElementById('booking-modal');
const bookingButton = document.getElementById('booking-button');
const bookedModal = document.getElementById('booked-modal');
const closeButton = document.getElementById('close-button');
const confirmButton = document.getElementById('confirm-button');
const currentStatus = document.getElementById('current-status');
const currentMeeting = document.getElementById('current-meeting');
const nextMeeting = document.getElementById('next-meeting');
const signInButton = document.getElementById('authorize-button');
const signOutButton = document.getElementById('signout-button');
const nextMeetingTime = document.getElementById('next-meeting-time');
const currentMeetingTime = document.getElementById('current-meeting-time');
const selectRoomMenu = document.getElementById('room-select');
const selectRoomTitle = document.getElementById('room-select-title');
const decrementButton = document.getElementById('decrement');
const incrementButton = document.getElementById('increment');
const bookTime = document.getElementById('time');
const roomName = document.getElementById('room-name');
const bookedOrNot = document.getElementById('booked-or-not');

mainScreen.addEventListener('touchstart', getSwipePosition);
mainScreen.addEventListener('touchmove', getSwipeDirection);

adminModal.addEventListener('touchstart', getSwipePosition);
adminModal.addEventListener('touchmove', getSwipeDirection);

availabilityModal.addEventListener('touchstart', getSwipePosition);
availabilityModal.addEventListener('touchmove', getSwipeDirection);

bookingModal.addEventListener('touchstart', getSwipePosition);
bookingModal.addEventListener('touchmove', getSwipeDirection);

bookingButton.addEventListener('touchend', toggleBookingModal);
closeButton.addEventListener('touchend', toggleBookingModal);
confirmButton.addEventListener('touchend', confirmBooking);

selectRoomMenu.addEventListener('change', selectRoom);

decrementButton.addEventListener('touchstart', decrement);
incrementButton.addEventListener('touchstart', increment);
