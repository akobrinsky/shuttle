# frontend-challenge

This challenge was bootstrapped like any Vue 3 project.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

## Run test suite
```sh
npm run test
```

Once you run the project, follow the instructions there for the remainder of the challenge.
(Everything should be accessible at `localhost:5173` or wherever the npm run process suggests)

If you have any questions, please feel free to reach out to kevin@shuttlehq.com

![Kapture 2024-01-24 at 09 35 28](https://github.com/akobrinsky/shuttle/assets/22509914/34733303-4ffe-434d-924d-7e481239b823)

## Notes
I had fun with this! I decided on the modal pattern in the interest of time. This allowed me to use the same flow for creating and updating events. Also, in the interest of time, I only wired up a minimal test suite. Finally, I was planning on adding bulk deletion functionality but decided on spending the small amount of time on simple sorting instead.  

What could be added:
1. search
2. close modal when clicking parent / clicking outside of the modal or when pressing escape
3. more attention to mobile behavior, could maybe collapse to individual table views for each event
4. bulk deletion - select multiple or all rows
5. make prettier
6. only use modal for event creation and use inline editing for existing events
7. unhappy paths handled (error paths, empty state, etc)

## Screenshots
![Screenshot 2024-01-24 at 9 19 35 AM](https://github.com/akobrinsky/shuttle/assets/22509914/12a110ed-e097-4e9f-a744-a95a5fc4e234)

![Screenshot 2024-01-24 at 9 19 49 AM](https://github.com/akobrinsky/shuttle/assets/22509914/92468d65-3998-4980-8e07-d9b7207e1c1b)

![Mobile Modal](https://github.com/akobrinsky/shuttle/assets/22509914/fd852e6e-fd0b-4a1b-8704-620e08a1eaed)
