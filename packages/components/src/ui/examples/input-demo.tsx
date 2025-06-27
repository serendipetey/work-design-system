import React, { useState } from "react";
import { Input } from "@/ui/input";

// Simple icons for demos
const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// **Copy-Paste Examples for AI Tools**

// 1. Basic Input
export const BasicInput = () => (
  <Input label="Full Name" placeholder="Enter your full name" />
);

// 2. Required Field
export const RequiredInput = () => (
  <Input
    label="Email Address"
    labelState="required"
    type="email"
    placeholder="Enter your email"
    hintText="We'll never share your email"
  />
);

// 3. Optional Field
export const OptionalInput = () => (
  <Input
    label="Phone Number"
    labelState="optional"
    type="tel"
    placeholder="Enter your phone number"
  />
);

// 4. Input with Icon
export const InputWithIcon = () => (
  <Input
    label="Search"
    placeholder="Search for anything..."
    leftIcon={<SearchIcon />}
  />
);

// 5. Error State
export const ErrorInput = () => (
  <Input
    label="Username"
    defaultValue="invalid-user"
    error="Username must be at least 3 characters"
  />
);

// 6. Success State
export const SuccessInput = () => (
  <Input
    label="Password"
    type="password"
    defaultValue="SecurePassword123!"
    success="Password is strong"
  />
);

// 7. Clearable Input
export const ClearableInput = () => {
  const [value, setValue] = useState("Clear me!");

  return (
    <Input
      label="Message"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue("")}
      clearable
      placeholder="Type something..."
    />
  );
};

// 8. Loading State
export const LoadingInput = () => (
  <Input
    label="Checking availability"
    defaultValue="username123"
    loading
    placeholder="Enter username"
    hintText="Checking if username is available..."
  />
);

// 9. Disabled State
export const DisabledInput = () => (
  <Input
    label="Account ID"
    defaultValue="ACC-12345"
    disabled
    hintText="This field cannot be edited"
  />
);

// 10. Date Input with Calendar Icon
export const DateInput = () => (
  <Input label="Date of Birth" type="date" rightIcon={<CalendarIcon />} />
);

// **Complete Form Examples**

// Simple Contact Form
export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <div className="space-y-4 max-w-md">
      <h2 className="text-xl font-semibold">Contact Us</h2>

      <Input
        label="Full Name"
        labelState="required"
        value={formData.name}
        onChange={handleChange("name")}
        placeholder="Enter your full name"
      />

      <Input
        label="Email"
        labelState="required"
        type="email"
        value={formData.email}
        onChange={handleChange("email")}
        placeholder="Enter your email address"
        hintText="We'll use this to respond to you"
      />

      <Input
        label="Phone"
        labelState="optional"
        type="tel"
        value={formData.phone}
        onChange={handleChange("phone")}
        placeholder="Enter your phone number"
      />
    </div>
  );
};

// Login Form with Validation
export const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!credentials.username) {
      newErrors.username = "Username is required";
    }

    if (credentials.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-4 max-w-sm">
      <h2 className="text-xl font-semibold">Sign In</h2>

      <Input
        label="Username"
        labelState="required"
        value={credentials.username}
        onChange={(e) =>
          setCredentials((prev) => ({ ...prev, username: e.target.value }))
        }
        placeholder="Enter your username"
        error={errors.username}
        leftIcon={<SearchIcon />}
      />

      <Input
        label="Password"
        labelState="required"
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials((prev) => ({ ...prev, password: e.target.value }))
        }
        placeholder="Enter your password"
        error={errors.password}
        loading={loading}
      />
    </div>
  );
};

// Search Interface
export const SearchInterface = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);

    if (value.length > 0) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => setIsSearching(false), 1000);
    }
  };

  return (
    <div className="space-y-4 max-w-lg">
      <Input
        label="Search"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onClear={() => setQuery("")}
        placeholder="Search products, categories, or brands..."
        leftIcon={<SearchIcon />}
        clearable
        loading={isSearching}
        hintText="Try searching for 'laptop', 'headphones', or 'furniture'"
      />
    </div>
  );
};

// **Size Comparison Demo**
export const SizeComparison = () => (
  <div className="space-y-4">
    <Input
      size="sm"
      label="Small"
      placeholder="Small input"
      leftIcon={<SearchIcon />}
    />

    <Input
      size="md"
      label="Medium (Default)"
      placeholder="Medium input"
      leftIcon={<SearchIcon />}
    />

    <Input
      size="lg"
      label="Large"
      placeholder="Large input"
      leftIcon={<SearchIcon />}
    />

    <Input
      size="xl"
      label="Extra Large"
      placeholder="Extra large input"
      leftIcon={<SearchIcon />}
    />
  </div>
);

// **All States Demo**
export const AllStatesDemo = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Input label="Default" placeholder="Default state" />

    <Input
      label="With Icon"
      placeholder="Default with icon"
      leftIcon={<CalendarIcon />}
    />

    <Input
      label="Error"
      defaultValue="invalid-input"
      error="This field has an error"
    />

    <Input
      label="Success"
      defaultValue="valid-input"
      success="This field is valid"
    />

    <Input
      label="Warning"
      defaultValue="warning-input"
      warning="Please double-check this field"
    />

    <Input label="Loading" defaultValue="checking..." loading />

    <Input label="Disabled" defaultValue="Cannot edit" disabled />

    <Input
      label="Clearable"
      defaultValue="Clear me!"
      clearable
      onClear={() => {}}
    />
  </div>
);

// **Export all for easy import**
export default {
  BasicInput,
  RequiredInput,
  OptionalInput,
  InputWithIcon,
  ErrorInput,
  SuccessInput,
  ClearableInput,
  LoadingInput,
  DisabledInput,
  DateInput,
  ContactForm,
  LoginForm,
  SearchInterface,
  SizeComparison,
  AllStatesDemo,
};
