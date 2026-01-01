/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface Leader {
  name: string;
  role: string;
  delay: string;
}

export interface Era {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}