self.addEventListener('push', function(event) {  
  // Since there is no payload data with the first version  
  // of push messages, we'll grab some data from  
  // an API and use it to populate a notification  
  event.waitUntil(  
    fetch("http://localhost:8080/v1.1/monitor/event/eB0IKOxeJyA:APA91bGG-IX4ybHVtTegodsAQIQUEWXXFDEYnWrHYwUrUJ4hm9o0H-Jb0SRexROKVcYrD2rOk7dtZ6vDgobcx80CN9eAGJdyw-Gm3S402s-0qve_x6uLvn4VxXDXPwpflSdcEO5HLDUW").then(function(response) {  
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
        var icon = data.notification.icon;  
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