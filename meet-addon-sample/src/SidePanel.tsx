'use client';

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  meet,
  MeetSidePanelClient,
} from '@googleworkspace/meet-addons/meet.addons';

// Replace these with your actual constants
const ACTIVITY_SIDE_PANEL_URL = '/side-panel';
const CLOUD_PROJECT_NUMBER = 'CLOUD_PROJECT_NUMBER'; // Replace with your actual cloud project number
const MAIN_STAGE_URL = '/mainstage';

/**
 * @see {@link https://developers.google.com/meet/add-ons/guides/overview#side-panel}
 */
function SidePanel() {
  const [sidePanelClient, setSidePanelClient] = useState(null);
  const location = useLocation();
  const [urlParams, setUrlParams] = useState({});

  /**
   * Starts the add-on activity and passes the selected color to the Main Stage,
   * as part of the activity starting state.
   */
  async function startCollaboration(e) {
    if (!sidePanelClient) {
      throw new Error('Side Panel is not yet initialized!');
    }

    const startingColor = (
      document.getElementById('starting-color')
    ).value;
    
    try {
      await sidePanelClient.startActivity({
        mainStageUrl: MAIN_STAGE_URL,
        sidePanelUrl: ACTIVITY_SIDE_PANEL_URL,
        // Pass the selected color to customize the initial display.
        additionalData: `{"startingColor": "${startingColor}"}`,
      });
      window.location.replace(ACTIVITY_SIDE_PANEL_URL + window.location.search);
    } catch (error) {
      console.error('Failed to start collaboration:', error);
    }
  }

  useEffect(() => {
    // Parse current URL parameters
    const params = new URLSearchParams(location.search);
    const paramObj = {};
    for (const [key, value] of params.entries()) {
      paramObj[key] = value;
    }
    setUrlParams(paramObj);
  }, [location]);

  useEffect(() => {
    /**
     * Initializes the Add-on Side Panel Client.
     * https://developers.google.com/meet/add-ons/reference/websdk/addon_sdk.meetsidepanelclient
     */
    async function initializeSidePanelClient() {
      try {
        const session = await meet.addon.createAddonSession({
          cloudProjectNumber: CLOUD_PROJECT_NUMBER,
        });
        const client = await session.createSidePanelClient();
        setSidePanelClient(client);
      } catch (error) {
        console.error('Failed to initialize side panel client:', error);
      }
    }
    
    initializeSidePanelClient();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Pretty Colors Side Panel
        </h2>
        
        <div className="mb-4">
          <p className="text-gray-600 mb-4">
            Welcome to Pretty Colors! This is a contrived demo add-on that lets you
            look at an animation involving your favorite color.
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="starting-color" className="block text-sm font-medium text-gray-700 mb-2">
            Pick a color you like. Everyone will see this:
          </label>
          <input
            aria-label="Color picker for animation in main stage"
            type="color"
            id="starting-color"
            name="starting-color"
            defaultValue="#00ff00"
            className="w-full h-12 border border-gray-300 rounded-md cursor-pointer"
          />
        </div>

        <button
          aria-label="Launch activity for all participants"
          onClick={startCollaboration}
          disabled={!sidePanelClient}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
            sidePanelClient
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {sidePanelClient ? 'Start activity' : 'Initializing...'}
        </button>

        {/* Debug info */}
        <div className="mt-6 p-3 bg-gray-100 rounded-md">
          <p className="text-xs text-gray-600">
            Status: {sidePanelClient ? 'Ready' : 'Initializing'}
          </p>
          <p className="text-xs text-gray-600">
            Current URL: {location.pathname + location.search}
          </p>
          <div className="mt-2">
            <p className="text-xs text-gray-600 font-semibold">URL Parameters:</p>
            <pre className="text-xs text-gray-500 mt-1">
              {Object.keys(urlParams).length > 0 ? JSON.stringify(urlParams, null, 2) : 'None'}
            </pre>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-sm text-blue-500 hover:text-blue-700 underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SidePanel;