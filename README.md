# React-beautiful-dnd with Next.js, Typescript and Tailwind

Important ==These notes are for future me so I can remember what I did. They may not make sense to you so, feel free to ignore them or use them as you see fit==.

This is a Next.js implementation of the original course for [React-beautiful-dnd] created by Alex Reardon (https://egghead.io/courses/beautiful-and-accessible-drag-and-drop-with-react-beautiful-dnd)

It works with Next 12 and React 18.

Also, to push it a bit further the implementation also uses Typescript and Tailwind and it was deployed on Vercel to make sure it works in the cloud.

This is the [Next React-beautiful-dnd Demo] (https://next-react-beautiful-dnd-calin-borbeli.vercel.app/)

---

## First fix

**Unable to find any drag handles** will require a custom \_document.js file that uses `resetServerContext` from react-beautiful-dnd.

---

## Second fix

Drag and drop not working with an error message saying that it **cannot find the droppable id**. This issue is only in development not in production.

The solution is to remove the `ReactStricMode` in the \next.config.js file. Or you can use `<React.StricMode>` as I did but wrap it after the `<DragDropContext>`.
