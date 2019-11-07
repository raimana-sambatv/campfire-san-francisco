// TODO: For meetings starting in less than 5 minutes, prevent booking a room
//

/**------------------------------------------------------------------------------------------------
 * Constants
 ------------------------------------------------------------------------------------------------*/

// used when initializing with gapi.client.init()
const initInfo = {
  // updated clientId from raimanadh to raimana-sambatv
  // updated apiKey from raimanadh to raimana-sambatv and added security restrictions
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
    displayName: "King's Landing",
    calendarId: 'samba.tv_2d3236383639333636323530@resource.calendar.google.com'
  },
  {
    roomNumber: '2',
    displayName: 'The Magic Box',
    calendarId: 'samba.tv_3435363335313735333933@resource.calendar.google.com'
  },
  {
    roomNumber: '3',
    displayName: 'Taco Town',
    calendarId: 'samba.tv_353937363937353533@resource.calendar.google.com'
  },
  {
    roomNumber: '4',
    displayName: 'Los Pollos Hermanos',
    calendarId: 'samba.tv_3539323638343534313431@resource.calendar.google.com'
  },
  {
    roomNumber: '5',
    displayName: '221B Baker Street',
    calendarId: 'samba.tv_3130373433363338333432@resource.calendar.google.com'
  },
  {
    roomNumber: '6',
    displayName: 'The Krusty Krab',
    calendarId: 'samba.tv_3238313931383732383334@resource.calendar.google.com'
  },
  {
    roomNumber: '7',
    displayName: 'New New York',
    calendarId: 'samba.tv_3436373930323037333730@resource.calendar.google.com'
  },
  {
    roomNumber: '8',
    displayName: 'Serenity',
    calendarId: 'samba.tv_36333235343735373035@resource.calendar.google.com'
  },
  {
    roomNumber: '9',
    displayName: "Freddy's BBQ Joint",
    calendarId: 'samba.tv_2d33303139353837383736@resource.calendar.google.com'
  },
  {
    roomNumber: '10',
    displayName: 'The Peach Pit',
    calendarId: 'samba.tv_2d3430393433383638363238@resource.calendar.google.com'
  },
  {
    roomNumber: '11',
    displayName: "Paddy's Pub",
    calendarId: 'samba.tv_3930373230363534373831@resource.calendar.google.com'
  },
  {
    roomNumber: '12',
    displayName: 'The Upside Down',
    calendarId: 'samba.tv_2d33393739363537303938@resource.calendar.google.com'
  },
  {
    roomNumber: '13',
    displayName: 'TARDIS',
    calendarId: 'samba.tv_2d3630363531353332313638@resource.calendar.google.com'
  },
  {
    roomNumber: '14',
    displayName: "Bluth's Original Frozen Banana Stand",
    calendarId: 'samba.tv_2d36383639333738333836@resource.calendar.google.com'
  },
  {
    roomNumber: '15',
    displayName: 'The Batcave',
    calendarId: 'samba.tv_2d3938373538383936323037@resource.calendar.google.com'
  },
  {
    roomNumber: '16',
    displayName: 'Cone of Silence',
    calendarId: 'samba.tv_2d3439373735393530383337@resource.calendar.google.com'
  },
  {
    roomNumber: '17',
    displayName: 'Hooli',
    calendarId: 'samba.tv_2d35373532303938343236@resource.calendar.google.com'
  },
  {
    roomNumber: '18',
    displayName: 'Wellness',
    calendarId: 'samba.tv_35393138363632313934@resource.calendar.google.com'
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
      scope: initInfo.scopes,
      immediate: false
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
