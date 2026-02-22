/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

// Fix: Explicitly extending React.Component to resolve inheritance type errors for setState and props
export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-12 bg-slate-50 border-2 border-dashed border-red-200">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <ShieldAlert size={32} />
            </div>
            <h2 className="font-serif text-3xl text-ui-blue mb-4 italic">Protocol Disruption</h2>
            <p className="text-sm text-slate-500 mb-8 font-light uppercase tracking-widest leading-relaxed">
              A runtime divergence has been detected in this archival module. The Secretariat is working to stabilize the matrix.
            </p>
            {/* Fix: setState is a method inherited from React.Component. Arrow function ensures correct 'this' context. */}
            <button 
              // Fix: Add type assertion to ensure `setState` is recognized on `this`.
              onClick={() => (this as React.Component<Props, State>).setState({ hasError: false })}
              className="px-8 py-3 bg-ui-blue text-white font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 mx-auto hover:bg-nobel-gold transition-all shadow-xl"
            >
              <RefreshCcw size={14} /> Attempt Recovery
            </button>
          </div>
        </div>
      );
    }

    // Fix: Add type assertion to ensure `props` is recognized on `this`.
    return (this as React.Component<Props, State>).props.children;
  }
}