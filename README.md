# analyze-image-web-app
### Image Recognition Web Application using Azure Cognitive Services
In this tutorial, you will learn how to create a simple web application that uses Azure Cognitive Services to recognize and describe the content of an uploaded image. The web application will allow users to select an image file, use the Azure Cognitive Services API to analyze the image, and display the description and tags of the recognized content.

## Prerequisites
Before we start, make sure you have the following:
- An Azure account. If you don't have one, you can create a free account here: https://azure.microsoft.com/free/
- A subscription key for the Azure Cognitive Services Computer Vision API. You can get one by following these instructions: https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-apis-create-account
- Basic knowledge of HTML, CSS, and JavaScript

## Step 1: Create an Azure Cognitive Services Resource
To use Azure Cognitive Services, you need to create a resource in your Azure account. Follow these steps to create a Cognitive Services resource:

Sign in to the Azure portal at https://portal.azure.com/

Click on the "Create a resource" button (the plus sign in the upper left corner)

In the search bar, type "Cognitive Services"

Select "Cognitive Services" from the search results and click the "Create" button

Fill in the required information for the resource. Choose "Computer Vision" as the resource type and select your preferred subscription and resource group

Click "Review + create" to review your settings, then click "Create" to create the resource

## Step 2: Get the Cognitive Services Endpoint and Subscription Key
After you create the Cognitive Services resource, you need to get the endpoint and subscription key to use in the web application. Follow these steps to get the endpoint and subscription key:

In the Azure portal, go to your Cognitive Services resource

Click on the "Keys and Endpoint" tab

Copy the "Key1" value

Copy the "Endpoint" value

## Step 3: Create the Web Application
In this step, you will create the HTML and JavaScript code for the web application

Open your favorite text editor and create a new file called `index.html`. Copy the following code into the file:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Image Recognition Web Application using Azure Cognitive Services</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>

<body>
    <div class="container mt-5">
        <h1 class="text-center mb-5">Image Recognition Web App</h1>
        <div class="row justify-content-center mb-3">
            <div class="col-12 col-md-8 col-lg-6">
                <input type="file" class="form-control-file" id="imageFile" accept="image/*">
            </div>
            <div class="col-12 col-md-2">
                <button class="btn btn-primary w-100" onclick="recognizeImage()">Recognize</button>
            </div>
        </div>
        <div class="row justify-content-center mb-5">
            <div class="col-12 col-md-8 col-lg-6">
                <img id="imageDisplay" class="img-fluid">
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6">
                <div id="descriptionDisplay"></div>
            </div>
            <div class="col-12 col-md-2">
                <a href="https://github.com/paraskevasleivadaros/analyze-image-web-app"
                    class="btn btn-outline-primary w-100" target="_blank">Source code</a>
            </div>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script>
        function recognizeImage() {
            var formData = new FormData();
            var fileInput = document.getElementById('imageFile');
            formData.append('image', fileInput.files[0]);

            $.ajax({
                url: 'https://<your-cognitive-services-endpoint>/vision/v3.2/analyze?visualFeatures=Description',
                beforeSend: function (xhrObj) {
                    xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "<your-cognitive-services-subscription-key>");
                },
                type: "POST",
                data: fileInput.files[0],
                processData: false
            })
                .done(function (data) {
                    // Display the image
                    var imageURL = URL.createObjectURL(fileInput.files[0]);
                    $('#imageDisplay').attr('src', imageURL);

                    // Display the description
                    var description = data.description;
                    var descriptionText = "<p><strong>Description: </strong>" + description.captions[0].text + "</p>";
                    descriptionText += "<p><strong>Tags: </strong>" + description.tags.join(", ") + "</p>";
                    descriptionText += "<p><strong>Accuracy: </strong>" + (description.captions[0].confidence * 100).toFixed(2) + "%</p>";
                    $('#descriptionDisplay').html(descriptionText);
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert('Error: ' + textStatus);
                });
        }
    </script>
    <footer class="mt-5 text-center">
    </footer>
</body>

</html>
```

In this code, we have an HTML page with a simple form consisting of an input field for selecting an image file, a button to start the recognition process, and two empty divs for displaying the image and its analysis. The `script` tag at the bottom of the page contains the JavaScript code that will handle the image recognition.

Make sure to replace `<your-cognitive-services-endpoint>` and `<your-cognitive-services-subscription-key>` with your own values.

Save the file and open it in your browser. That's it!

## Conclusion
In this tutorial, we have seen how to create a simple image recognition web application using Azure Cognitive Services. We have used the Vision API to analyze an image and extract its description and tags

This example can be extended to support more advanced scenarios, such as object detection or face recognition, using the other features provided by the Vision API or other Cognitive Services

I hope that this tutorial has been helpful for you to understand how to use Azure Cognitive Services to build intelligent applications. If you have any questions or feedback, please let me know by opening a new issue.

![a group of raccoons](https://user-images.githubusercontent.com/16403754/225921803-cd376bfb-58aa-48ca-8a37-eef337ae39f0.PNG)

## 🛠️ Tech Stack
[![Azure](https://skills.thijs.gg/icons?i=azure)](https://azure.microsoft.com/)
[![HTML](https://skills.thijs.gg/icons?i=html)](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Copyright & License
[MIT](https://github.com/paraskevasleivadaros/analyze-image-web-app/blob/master/LICENSE)
