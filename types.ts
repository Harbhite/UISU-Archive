/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

/**
 * Props for a generic Section component.
 * Used to define the structure and content of a section within the application.
 */
export interface SectionProps {
  /** The unique identifier for the section, often used for navigation or anchor links. */
  id: string;
  /** The title of the section to be displayed as a heading. */
  title: string;
  /** The content to be rendered inside the section. */
  children: React.ReactNode;
  /** Optional additional CSS class names to apply to the section container. */
  className?: string;
}

/**
 * Represents a leader entity, typically used in the PastLeaders component.
 */
export interface Leader {
  /** The name of the leader. */
  name: string;
  /** The role or position held by the leader. */
  role: string;
  /** The animation delay string (e.g., "0.1s") for staggered entrance animations. */
  delay: string;
}

/**
 * Represents a historical era or time period.
 * Used for categorized displays of history or timeline events.
 */
export interface Era {
  /** The unique identifier for the era. */
  id: string;
  /** The title or name of the era. */
  title: string;
  /** A brief description of the era. */
  desc: string;
  /** An icon representing the era, typically a React component or element. */
  icon: React.ReactNode;
}
