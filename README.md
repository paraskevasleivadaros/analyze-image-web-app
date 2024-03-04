# 🔍💻🖼️ analyze-image-web-app
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
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Image Recognition App</title>
    <!-- Link to Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <style>
        /* Add custom CSS styles here if needed */
        body, html {
            height: 100%;
            margin: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #f4f4f4;
        }

        .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        #fileInputContainer {
            border: 2px dashed #ccc;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            background-color: #f9f9f9;
        }

        /* Rest of your existing styles... */

        footer {
            margin-top: 20px;
        }

        /* New style to scale down the recognized image container */
        .img-container {
            max-width: 300px;
            margin: 0 auto;
        }

        /* Style for the recognized image */
        #imageDisplay {
            max-width: 100%;
            max-height: 300px;
            margin: 0 auto;
        }
    </style>
</head>

<body>
    <div class="container mt-5">
        <h1 class="text-center mb-5">Image Recognition</h1>

        <div class="text-center mb-3">
            <!-- Container for the file input with drag-and-drop functionality -->
            <div id="fileInputContainer" onclick="document.getElementById('imageFile').click()">
                <span>Click to choose a file</span>
                <input type="file" class="form-control-file" id="imageFile" accept="image/*" style="display: none;"
                    onchange="recognizeImage()">
            </div>
        </div>

        <div class="text-center mb-5" id="recognizedImageSection" style="display: none;">
            <!-- Loading animation -->
            <div id="loadingAnimation" class="lds-ring" style="display: none;">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <!-- Display recognized image -->
            <div id="imageContainer" class="img-container">
                <img id="imageDisplay" class="img-fluid" alt="Recognized Image">
            </div>
        </div>

        <div class="text-center" id="descriptionDisplay" style="display: none;">
            <!-- Display recognized image description -->
        </div>

        <div class="text-center mt-3">
            <!-- Link to source code on GitHub -->
            <a href="https://github.com/paraskevasleivadaros/analyze-image-web-app"
                class="btn btn-outline-primary" target="_blank">Source Code</a>
        </div>
    </div>

    <!-- Link to jQuery and Bootstrap JavaScript -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script>
        function recognizeImage() {
            var formData = new FormData();
            var fileInput = document.getElementById('imageFile');
            formData.append('image', fileInput.files[0]);

            // Show loading animation and hide file input container
            document.getElementById('fileInputContainer').style.display = 'none';
            document.getElementById('loadingAnimation').style.display = 'block';

            $.ajax({
                url: 'https://analyzeimage-leivadaros.cognitiveservices.azure.com/vision/v3.2/analyze?visualFeatures=Description',
                beforeSend: function (xhrObj) {
                    xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "a03ab615821a4f78ba4afce0e0c71ede");
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

                // Hide loading animation and show recognized image section
                document.getElementById('loadingAnimation').style.display = 'none';
                document.getElementById('recognizedImageSection').style.display = 'block';
                document.getElementById('descriptionDisplay').style.display = 'block';

                // Show the "Choose File" button again
                document.getElementById('fileInputContainer').style.display = 'block';
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert('Error: ' + textStatus);
                // Hide loading animation and show file input container
                document.getElementById('loadingAnimation').style.display = 'none';
                document.getElementById('fileInputContainer').style.display = 'block';
            });
        }
    </script>
    <footer class="mt-5 text-center">
        <!-- Footer content -->
        Design and Development by <a href="https://leivadaros.dev/" target="_blank">Paraskevas Leivadaros</a>
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

### 📐 System Design
| Front-End Components                                  | Back-End Components                                  |
|-------------------------------------------------------|------------------------------------------------------|
| **HTML/CSS/Bootstrap**                                | **Azure Cognitive Services API**                     |
| - Structure and layout of the web page                | - Handles image processing and analysis              |
| - Styling and responsive design                       |                                                      |
|                                                       |                                                      |
| **JavaScript**                                        |                                                      |
| - Handling image upload functionality (upload button) |                                                      |
| - Making AJAX request to Azure API                    |                                                      | 
| - Displaying results (image, description, tags)       |                                                      |
|                                                       |                                                      |
| **GitHub Pages Hosting**                              |                                                      |
| - Static hosting for HTML, CSS, and JS                |                                                      |
| - Utilizes GitHub's CDN for content delivery          |                                                      |

![analyze-image-web-app-system-design](https://github.com/paraskevasleivadaros/analyze-image-web-app/assets/16403754/feb44eb0-9467-4a0b-8fa7-c0c9d53761d8)

### 🛠️ Tech Stack
[![Azure](https://skills.thijs.gg/icons?i=azure)](https://azure.microsoft.com/)
[![HTML](https://skills.thijs.gg/icons?i=html)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![GitHub Actions](https://skills.thijs.gg/icons?i=githubactions)](https://github.com/features/actions)

### © Copyright & License
[MIT](https://github.com/paraskevasleivadaros/analyze-image-web-app/blob/master/LICENSE)
