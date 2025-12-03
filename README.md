This repo contains instructions for the take home technical assessment for the SWE role at Tummala Motors.

# Getting Started Instructions

Before we dive into the details of the assignment, here are the instructions to get started.

-   Fork this repo under your own github account.
-   Add `skrishnan99` as a collaborator to your forked repo.
-   Implement your solution in this repo and when you are ready, create a PR and request a review from `skrishnan99`.
-   For any questions you may have as you work on the assignment, raise an issue in your forked repo with the question
    and tag `skrishnan99` in that issue. If you don't receive a response within 24 hrs of you raising the issue, feel free to
    reach out to Parsa Ariane and we will make sure to get on it.

# Task Overview

As part of this assessment, you will create two web pages.

1. Vehicle Info Table

    - This page displays a table that shows some information about the vehicles in the dealership's inventory.
        - It is sufficient to show just this information in the Vehicle Info Table
            1. Number
            2. VIN
            3. Link to Vehicle Listing Page
    - This page also has a `Add New Vehicle` button which will go to a form that asks the user to input some
      details regarding a new car and once they hit submit, the vehicle info table should reflect the addition of the
      new vehicle.
        - At a minimum, you need to collect these fields for the `Add New Vehicle` form.
            1. VIN
            2. A brief description about the car
            3. Car Manufacturer Name
            4. Car Model
            5. List of image links for the car
    - Prepopulate the vehicle info table with info for a few cars. You can find some example data for cars at
      [assets/swe_technical_assessment_data.csv](assets/swe_technical_assessment_data.csv).
    - You do not need to provide ability to update a vehicle's information or delete a vehicle from the vehicle info table.

2. Vehicle Listing Page

    - This page displays detailed information for each vehicle in the Vehicle Info Table.
    - At a minimum, you need to display the following information in the Vehicle Listing Page
        1. Images of the car
        2. A brief description about the car
        3. Car Manufacturer Name
        4. Car Model
        5. VIN
    - For design inspiration, look at the listing pages of websites like Airbnb, Carvana, etc. You don't need to add
      any additional functionality or show any additional information other than the ones listed above.

## NOTE:

I have attached a very minimal drawing showcasing the above described functionality for the two web pages. You will be
evaluated on both the quality of the technical implementation as well as your design sense. So, please invest thought into
the aesthetics and the user experience of your components.

![Minimal Drawing of Required Webpages](assets/webpage_drawing.png)

# Tech Stack

-   The frontend has to be made using Next.js, React and TypeScript.
-   You can use any CSS framework you like. You can also use any UI component libraries you like.
-   You have to use a Postgres database for storing the vehicle information. You can create a free account on any
    Postgres cloud provider like Supabase and use that.
-   We would prefer you write the backend in Python, but if you are not familiar with Python at all, you can write it in
    TypeScript - Node or Bun.

# Deadline

Plan to spend no more than **8 hrs** in total on this assessment. We will give you a few days to work on it so you
can work around your other time commitments.

# Evaluation Criteria

1. Correctness of the implementation.
2. UI/UX of the webpages.
3. Your implementation approach and thought process.

# Submission Details

1. Create a PR in your forked repo with the full implementation and request a review from `skrishnan99`.
2. Add a file called `INSTRUCTIONS.md` with instructions on how to run your code.
3. In `INSTRUCTIONS.md`, add a video showing you using the two webpages. Specifically, show the following usecases
    - Add a new vehicle's information using the form.
    - Show that the vehicle addition reflects on the vehicle info table.
    - Click on the preview link of the newly added vehicle and show the vehicle's listing page.
