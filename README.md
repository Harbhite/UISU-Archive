# UISU Archive

The **UISU Archive** is a digital platform dedicated to preserving the history, culture, and intellectual heritage of the University of Ibadan Students' Union (UISU). It serves as a comprehensive repository for union documents, a hall of fame for past leaders, and a guide to the union's governance structure and campus life.

## Features

*   **Executive Archive (Hall of Fame):** A searchable database of past union administrations, including key achievements and executive team members.
*   **Document Library:** A digitized collection of constitutions, bills, manifestos, speeches, and reports. Includes text-to-speech narration for accessibility.
*   **Governance Guide:** An interactive guide to the three arms of the union government: The Executive (CEC), The Legislative (SRC), and The Judiciary.
*   **Campus Map & Halls:** An interactive map and detailed information about the Halls of Residence (Republics).
*   **Clubs & Societies Directory:** A comprehensive directory of student organizations, categorized by interest.
*   **News & Announcements:** A feed for official union releases, events, and memos.
*   **Trivia Challenge:** An interactive quiz to test knowledge about the union's history.
*   **Immersive Experience:** Features 3D visualizations (Three.js) and smooth animations (Framer Motion) to create an engaging user experience.

## Tech Stack

*   **Frontend Framework:** [React](https://react.dev/) (v19)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **3D Graphics:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) & [Drei](https://github.com/pmndrs/drei)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **UI Utilities:** `clsx`, `tailwind-merge`, `class-variance-authority`

## Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/uisu-archive.git
    cd uisu-archive
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    *   Create a `.env.local` file in the root directory.
    *   Add your Gemini API key (if required for specific features, though the core app is largely static):
        ```env
        GEMINI_API_KEY=your_api_key_here
        ```

### Running the App

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Building for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist` directory.

## Project Structure

*   `src/` (implied root in this Vite config)
    *   `App.tsx`: Main application component and routing logic.
    *   `components/`: Reusable React components and page sections.
        *   `ui/`: Generic UI components (buttons, shaders).
        *   `Announcements.tsx`: News feed component.
        *   `CampusMap.tsx`: Interactive map and hall details.
        *   `Communities.tsx`: Clubs and societies directory.
        *   `Diagrams.tsx`: Charts and diagrams for history and structure.
        *   `DocumentLibrary.tsx`: Document repository with audio features.
        *   `Governance.tsx`: Governance structure breakdown.
        *   `PastLeaders.tsx`: Hall of Fame list.
        *   `QuantumScene.tsx`: 3D background scenes.
        *   `ThreeElements.tsx`: Individual 3D models.
        *   `Trivia.tsx`: Interactive quiz.
    *   `lib/`: Utility functions (e.g., `cn` for class merging).
    *   `types.ts`: Global TypeScript type definitions.
    *   `vite.config.ts`: Vite configuration.

## License

This project is licensed under the Apache 2.0 License.
