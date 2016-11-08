self.addEventListener('push', function(event) {  
  // Since there is no payload data with the first version  
  // of push messages, we'll grab some data from  
  // an API and use it to populate a notification  

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer 2.ndKkx4kQyfC7wMxUXC6UJDTZhNreMlzvc9wR1keJ.1448958474");
  myHeaders.append("contentType", "text/plain");
  myHeaders.append("Access-Control-Allow-Origin", "http://localhost:8000")
  myHeaders.append("Access-Control-Allow-Credentials", "True")
  var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

  var myRequest = new Request('http://localhost:8080/v1.1/monitor/event/c6mYoXIyQBM:APA91bFvNZ_e2nC9Z_HCq_aJcO6GE9by95flk0WfUInZfqiA_E8eembbfnsSD7o2lwB6nTGEqQvji05FWz85vw6_fZE570hQrV9thCVIBJMXFpYyl_y5SRns-dnXP8bki46bKWOx0FJD',myInit);

  event.waitUntil(  
    fetch(myRequest, myInit).then(function(response) { 
      if (response.status !== 200) {  
        // Either show a message to the user explaining the error  
        // or enter a generic message and handle the
        // onnotificationclick event to direct the user to a web page  
        console.log('Looks like there was a problem. Status Code: ' + response.status);  
        throw new Error();  
      }

      // Examine the text in the response  
      return response.json().then(function(data) {  
        if (data.error || !data.result) {  
          console.error('The API returned an error.', data.error);  
          throw new Error();  
        }  

        var title = "Qnap message";  
        var message = data.result.message;  
        var icon = "";  
        var tag = 'simple-push-demo-notification-tag';

        return self.registration.showNotification(title, {  
          body: message,  
          icon: icon,  
          tag: tag  
        });  
      });  
    }).catch(function(err) {  
      console.error('Unable to retrieve data', err);

      var title = 'An error occurred';
      var message = 'We were unable to get the information for this push message';  
      var icon = URL_TO_DEFAULT_ICON;  
      var notificationTag = 'notification-error';  
      return self.registration.showNotification(title, {  
          body: message,  
          icon: icon,  
          tag: notificationTag  
        });  
    })  
  );  
});