# Binary Trees — DSA Visualizer

How to run:
1. Extract the zip.
2. Run `npm install`
3. Run `npm run dev`
4. Open the dev server (usually http://localhost:5173)

# Software Requirements Specification (SRS)

**Project:** Binary Trees — DSA Visualizer (scaffold)

**Prepared by:** 

**Date:** 23 September 2025

**Standard:** IEEE Std 830-1998 (adapted)

---

## 1. Introduction

### 1.1 Purpose

This document provides the Software Requirements Specification (SRS) for the Binary Trees — DSA Visualizer project. It defines functional and non-functional requirements, system features, constraints, and acceptance criteria according to the IEEE standard. The intended audience includes developers, testers, instructors, and learners interested in extending or using the system.

### 1.2 Scope

The Binary Trees Visualizer is a client-side web application for demonstrating and teaching tree-based data structures (Binary Search Tree, AVL Tree, Red-Black Tree, Heap, Tries). It includes interactive visualizations, theory explanations, story-based learning, algorithm demonstrations, and quizzes. Technologies: React, Vite, D3.js, and Framer Motion.

### 1.3 Definitions, Acronyms, Abbreviations

* **SPA**: Single Page Application
* **UI**: User Interface
* **UX**: User Experience
* **BST**: Binary Search Tree
* **AVL**: Adelson-Velsky–Landis Tree (self-balancing BST)
* **RB**: Red-Black Tree
* **DSA**: Data Structures and Algorithms
* **API**: Application Programming Interface

### 1.4 References

* IEEE Std 830-1998: IEEE Recommended Practice for Software Requirements Specifications.
* Project repository: Binary-Trees-main (scaffold).

### 1.5 Overview

Subsequent sections detail the overall description (Section 2), specific requirements (Section 3 and 4), external interfaces (Section 5), and non-functional constraints (Section 6).

---

## 2. Overall Description

### 2.1 Product Perspective

The product is an educational front-end application. It is independent of a backend server and stores only transient data locally. It visualizes tree structures and explains algorithms interactively.

### 2.2 Product Functions

* Select tree type on Home page.
* Visualize tree insert/search operations with animations.
* Display theory content and story-based explanations.
* Show algorithm code snippets linked to visualizations.
* Provide a quiz module.
* Toggle themes (light/dark).

### 2.3 User Classes and Characteristics

* **Learner**: Student exploring trees; requires clarity and simplicity.
* **Instructor**: Uses story and quiz modules for teaching.
* **Developer**: Maintains or extends algorithms and animations.

### 2.4 Operating Environment

* Runs on modern browsers (Chrome, Firefox, Safari, Edge).
* Development requires Node.js and npm.

### 2.5 Design and Implementation Constraints

* Frontend-only implementation.
* Relies on D3.js for visualization and Framer Motion for transitions.
* Vite bundler for development.

### 2.6 Assumptions and Dependencies

* Users have a modern browser.
* Node.js runtime installed for development.
* No backend dependencies.

---

## 3. System Features

### 3.1 Home / Tree Selection

* **Description**: Displays tree types (BST, AVL, RB, Heap, Tries).
* **Stimulus/Response**: When the user clicks a tree type, the application navigates to the visualization page for that tree.
* **Requirements**:

  * The system shall display a list of available tree types on the Home page.
  * The system shall allow navigation to visualization and learning modules by selecting a tree type.

### 3.2 Visualization Canvas

* **Description**: Provides SVG/D3-based rendering with animations.
* **Requirements**:

  * The system shall render nodes and edges of the selected tree structure.
  * The system shall animate insertion and search operations step by step.
  * The system shall support zoom, pan, and reset view options.
  * The system shall allow users to input sequences or insert values manually.

### 3.3 Theory & Story Mode

* **Description**: Offers explanatory text and story-driven walkthroughs of concepts.
* **Requirements**:

  * The system shall display theoretical explanations for each tree type.
  * The system shall provide pre-authored scenarios (story mode) that explain algorithms through narrative and animation.

### 3.4 Algorithm Page

* **Description**: Presents pseudocode or code snippets and links them to visualization steps.
* **Requirements**:

  * The system shall display algorithm snippets (e.g., search, insert) for the chosen tree type.
  * The system shall highlight visualization steps corresponding to the selected code line.

### 3.5 Quiz

* **Description**: Provides interactive quizzes to test user knowledge.
* **Requirements**:

  * The system shall present multiple-choice or short-answer quiz questions.
  * The system shall provide immediate feedback and explanations for answers.

### 3.6 Theme Selector

* **Description**: Enables toggling between light and dark modes.
* **Requirements**:

  * The system shall allow users to toggle between light and dark themes.
  * The system shall persist the selected theme in local storage.

---

## 4. Specific Requirements

### 4.1 Functional Requirements

* The application must load the Home page when launched in a supported browser.
* The Home page must list at least BST, AVL, RB, Heap, and Tries.
* The visualization must accept user-provided sequences and render the resulting tree.
* The visualization must provide controls for animations including Play, Pause, Step Forward, Step Back, and Speed adjustment.
* The search operation must highlight visited nodes and indicate whether the target value was found.
* Story Mode must include at least one scenario for each supported tree type.
* The Algorithm page must display algorithm snippets and highlight visualization steps linked to code.
* The Quiz module must record scores locally and provide feedback for each answer.
* The Theme Selector must toggle between modes and remember user preference.
* The application must be responsive and usable on screens as small as 360px width.

### 4.2 Non-Functional Requirements

* Performance: Animations for up to 200 nodes should run without noticeable UI lag.
* Usability: The interface must provide clear labels, instructions, and tooltips.
* Accessibility: Primary controls must be operable via keyboard, with ARIA attributes applied.
* Maintainability: Code should follow modular practices separating visualization, UI, and content.
* Portability: The system must run on the latest two versions of Chrome, Firefox, Safari, and Edge.
* Security: No unsafe evaluation of user input (e.g., no use of `eval`).

### 4.3 External Interface Requirements

* User Interface: The system shall include navigation, content pages, and an SVG visualization area.
* Files: The system shall use precomputed animation JSON files located in `public/animations/`.
* Development: Developers shall install dependencies via `npm install` and run using `npm run dev`.

### 4.4 Data Requirements

* Tree nodes shall include attributes such as `id`, `value`, `left`, `right`, `color`, `height`, `x`, and `y`.
* Animation steps shall include operation type, involved nodes, textual description, and highlighted elements.

### 4.5 Constraints

* The application must run entirely on the client side without backend services.
* Persistent storage is limited to browser local storage.

---

## 5. Other Non-Functional Requirements

* Reliability: The application shall run without crashes under expected usage.
* Supportability: The repository shall provide installation and execution instructions.
* Scalability: The design shall allow future addition of tree types and operations.

---

## 6. Appendices

### 6.1 Acceptance Criteria / Test Cases

* Test Case 1: Launch the application and verify that the Home page loads correctly.
* Test Case 2: Select BST, input sequence `50,30,70,20,40,60,80`, and verify correct tree rendering.
* Test Case 3: Run insertion animation and verify correct order and step controls.
* Test Case 4: Search for value `60` and verify nodes are highlighted correctly.
* Test Case 5: Run AVL Story Mode and confirm explanations match the visualization.
* Test Case 6: Attempt a quiz, submit answers, and verify scoring with feedback.

### 6.2 Future Enhancements

* Add dynamic AVL and RB balancing with on-the-fly animations.
* Implement delete operations and rotation visualizations.
* Provide accessibility enhancements and testing.
* Add automated end-to-end tests (e.g., with Cypress or Playwright).
* Optimize performance for large trees (more than 1000 nodes).

