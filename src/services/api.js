const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchPropertyData(url, token) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/scrap-getPageContent`, {
      method: "POST",
      headers,
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching property data:", error);
    throw error;
  }
}

export async function fetchUserPdfs(token) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/scrap-getPdfsByUserId`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user PDFs:", error);
    throw error;
  }
}

export async function fetchPdfById(pdfId, token) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${API_BASE_URL}/scrap-getPdfById?pdfId=${pdfId}`,
      {
        method: "GET",
        headers,
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching PDF by ID:", error);
    throw error;
  }
}

export async function uploadImages(urls, pdfId, token) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/scrap-uploadImages`, {
      method: "POST",
      headers,
      body: JSON.stringify({ urls, pdfId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
}

export async function downloadImages(urls, token) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/scrap-uploadImages`, {
      method: "POST",
      headers,
      body: JSON.stringify({ urls }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error downloading images:", error);
    throw error;
  }
}

export const createPdf = async (pdfData, token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/scrap-createPdf`, {
      method: "POST",
      headers,
      body: JSON.stringify(pdfData),
    });

    if (!response.ok) {
      // Try to parse error response
      try {
        const errorData = await response.json();
        if (errorData.code === "NO_CREDITS_AVAILABLE") {
          const error = new Error(errorData.error || "No credits available");
          error.code = errorData.code;
          throw error;
        }
      } catch (parseError) {
        // If parsing fails, throw generic error
        if (parseError.code === "NO_CREDITS_AVAILABLE") {
          throw parseError;
        }
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating PDF:", error);
    throw error;
  }
};

export async function fetchUserById(token) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // Add Authorization header
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/scrap-getUserById`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      // If user not found (404), return null instead of throwing
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

export async function saveUserData(userData, token) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // Add Authorization header
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/scrap-createUser`, {
      method: "POST",
      headers,
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
}

export async function updateUserData(userData, token) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/scrap-updateUser`, {
      method: "PUT",
      headers,
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
}

export async function updatePdfConfig(pdfId, config, token) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/scrap-updatePdf`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ pdfId, config }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating PDF config:", error);
    throw error;
  }
}

export async function updateUserProfilePicture(photoUrl, token) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/scrap-updateUserPhoto`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ photoUrl }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user profile picture:", error);
    throw error;
  }
}

export async function fetchGalleryByPdfId(pdfId, token) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${API_BASE_URL}/scrap-getGalleryByPdfId?pdfId=${pdfId}`,
      {
        method: "GET",
        headers,
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching galleries by user ID:", error);
    throw error;
  }
}
