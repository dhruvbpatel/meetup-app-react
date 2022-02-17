import { useState, useEffect } from 'react';

import MeetupList from '../components/meetups/MeetupList';

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true); // for loading state
  const [loadedMeetups, setLoadedMeetups] = useState([]); // for updating data json

  useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://meetup-app-9d753-default-rtdb.firebaseio.com/meetups.json' // fetch from this url
    )
      .then((response) => {  // fetch will return promise
        return response.json();  //and we will convert the json to read plain text and this will also return promise
      })
      .then((data) => {
        const meetups = []; // for storing meetups

        for (const key in data) {  // iterare over firebase objects and adding into meetup data
          const meetup = {
            id: key, 
            ...data[key]  // spread operator to store rest of data as key value pair
          };

          meetups.push(meetup); // add data to meetup array
        }

        setIsLoading(false);// loading is done
        setLoadedMeetups(meetups); // set meetup
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} /> 
    </section>
  );
}

export default AllMeetupsPage;