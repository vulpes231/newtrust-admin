import { useFormik } from "formik";
import React, { useState, useEffect } from "react";

import {
  Button,
  Col,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  FormText,
} from "reactstrap";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createSavings, searchCountries } from "../../services/savingService";
import { Errormodal, Successmodal } from "../../components";

const styles = {
  label: "font-semibold text-[16px]",
  feedback: "font-medium text-[12px]",
  row: "py-2",
  tagContainer: "flex flex-wrap gap-2 mt-2",
  tag: "bg-[#5156be]/20 text-[#5156be] px-3 py-1 rounded-full text-sm flex items-center gap-2",
  removeTag: "cursor-pointer hover:text-red-500",
  dropdown:
    "absolute z-10 bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto w-full",
  dropdownItem: "px-4 py-2 hover:bg-gray-100 cursor-pointer",
  noteInput: "mb-2",
};

const CreateSavingModal = ({ isOpen, toggle }) => {
  const [error, setError] = useState("");
  const [countryQuery, setCountryQuery] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [noteInput, setNoteInput] = useState("");

  const mutation = useMutation({
    mutationFn: createSavings,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      toggle();
      validation.resetForm();
      setError("");
    },
  });

  const { data: searchResult, isLoading: isSearching } = useQuery({
    queryFn: () => searchCountries(countryQuery),
    queryKey: ["searchCountry", countryQuery],
    enabled: countryQuery.length > 1,
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      title: "",
      notes: [],
      symbol: "",
      subTitle: "",
      category: "",
      canTrade: "",
      interestRate: "",
      eligibleCountries: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter Account Name"),
      title: Yup.string().required("Enter Account Title"),
      symbol: Yup.string().required("Enter Account Symbol"),
      category: Yup.string().required("Select Account Category"),
      canTrade: Yup.string().required("Select Tradeability"),
      eligibleCountries: Yup.array()
        .min(1, "Select at least one eligible country")
        .required("Select Eligible Countries"),
    }),
    onSubmit: (values) => {
      console.log(values);
      mutation.mutate(values);
    },
  });

  const handleAddNote = () => {
    if (noteInput.trim()) {
      validation.setFieldValue("notes", [
        ...validation.values.notes,
        noteInput.trim(),
      ]);
      setNoteInput("");
    }
  };

  const handleRemoveNote = (index) => {
    const updatedNotes = validation.values.notes.filter((_, i) => i !== index);
    validation.setFieldValue("notes", updatedNotes);
  };

  const handleAddCountry = (country) => {
    if (!validation.values.eligibleCountries.includes(country)) {
      validation.setFieldValue("eligibleCountries", [
        ...validation.values.eligibleCountries,
        country,
      ]);
    }
    setCountryQuery("");
    setShowCountryDropdown(false);
  };

  const handleRemoveCountry = (country) => {
    const updatedCountries = validation.values.eligibleCountries.filter(
      (c) => c !== country
    );
    validation.setFieldValue("eligibleCountries", updatedCountries);
  };

  const handleCountryInputChange = (e) => {
    const value = e.target.value;
    setCountryQuery(value);
    setShowCountryDropdown(value.length > 1);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowCountryDropdown(false);
    };

    if (showCountryDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [showCountryDropdown]);

  useEffect(() => {
    if (mutation.isSuccess) {
      const timeout = setTimeout(() => {
        mutation.reset();
        validation.resetForm();
        setNoteInput("");
        setCountryQuery("");
        setError("");
        window.location.reload();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        mutation.reset();
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <React.Fragment>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        centered={true}
        size="lg"
        className="text-[#495057]"
      >
        <ModalHeader toggle={toggle}>Add a Savings Account</ModalHeader>
        <ModalBody>
          <form onSubmit={validation.handleSubmit} className="py-2 px-4">
            <Row className={styles.row}>
              <Col lg={6}>
                <div>
                  <Label className={styles.label}>Name</Label>
                  <Input
                    type="text"
                    name="name"
                    className="placeholder:text-[#495057]"
                    value={validation.values.name}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched.name && validation.errors.name
                        ? true
                        : false
                    }
                    placeholder="Enter Account Name"
                  />
                  {validation.touched.name && validation.errors.name ? (
                    <FormFeedback className={styles.feedback} type="invalid">
                      {validation.errors.name}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Label className={styles.label}>Title</Label>
                  <Input
                    type="text"
                    name="title"
                    className="placeholder:text-[#495057]"
                    value={validation.values.title}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched.title && validation.errors.title
                        ? true
                        : false
                    }
                    placeholder="Enter Account Title"
                  />
                  {validation.touched.title && validation.errors.title ? (
                    <FormFeedback className={styles.feedback} type="invalid">
                      {validation.errors.title}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col lg={6}>
                <div>
                  <Label className={styles.label}>Symbol</Label>
                  <Input
                    type="text"
                    name="symbol"
                    className="placeholder:text-[#495057]"
                    value={validation.values.symbol}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched.symbol && validation.errors.symbol
                        ? true
                        : false
                    }
                    placeholder="e.g SEP IRA"
                  />
                  {validation.touched.symbol && validation.errors.symbol ? (
                    <FormFeedback className={styles.feedback} type="invalid">
                      {validation.errors.symbol}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Label className={styles.label}>Subtitle</Label>
                  <Input
                    type="text"
                    name="subTitle"
                    className="placeholder:text-[#495057]"
                    value={validation.values.subTitle}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched.subTitle && validation.errors.subTitle
                        ? true
                        : false
                    }
                    placeholder="Enter Account Subtitle"
                  />
                  {validation.touched.subTitle && validation.errors.subTitle ? (
                    <FormFeedback className={styles.feedback} type="invalid">
                      {validation.errors.subTitle}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col lg={6}>
                <div>
                  <Label className={styles.label}>Tradeable</Label>
                  <Input
                    type="select"
                    name="canTrade"
                    className="placeholder:text-[#495057]"
                    value={validation.values.canTrade}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched.canTrade && validation.errors.canTrade
                        ? true
                        : false
                    }
                  >
                    <option value="">Can Account Trade?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Input>
                  {validation.touched.canTrade && validation.errors.canTrade ? (
                    <FormFeedback className={styles.feedback} type="invalid">
                      {validation.errors.canTrade}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Label className={styles.label}>Category</Label>
                  <Input
                    type="select"
                    name="category"
                    className="placeholder:text-[#495057]"
                    value={validation.values.category}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched.category && validation.errors.category
                        ? true
                        : false
                    }
                  >
                    <option value="">Select a Category</option>
                    <option value="retirement">Retirement</option>
                    <option value="savings">Savings</option>
                  </Input>
                  {validation.touched.category && validation.errors.category ? (
                    <FormFeedback className={styles.feedback} type="invalid">
                      {validation.errors.category}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col lg={12}>
                <div>
                  <Label className={styles.label}>Interest Rate</Label>
                  <Input
                    type="text"
                    name="interestRate"
                    className="placeholder:text-[#495057]"
                    value={validation.values.interestRate}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    placeholder="Enter Interest Rate (e.g., 5.5)"
                  />
                  <FormText>
                    Enter interest rate as a percentage (e.g., 5.5 for 5.5%)
                  </FormText>
                </div>
              </Col>
            </Row>

            <Row className={styles.row}>
              <Col lg={12}>
                <div>
                  <Label className={styles.label}>Notes</Label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      className="placeholder:text-[#495057]"
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleAddNote())
                      }
                      placeholder="Enter a note and press Enter or click Add"
                    />
                    <Button
                      type="button"
                      onClick={handleAddNote}
                      disabled={!noteInput.trim()}
                      style={{ backgroundColor: "#5156be" }}
                    >
                      Add
                    </Button>
                  </div>

                  {validation.values.notes.length > 0 && (
                    <div className={styles.tagContainer}>
                      {validation.values.notes.map((note, index) => (
                        <div key={index} className={styles.tag}>
                          {note}
                          <span
                            className={styles.removeTag}
                            onClick={() => handleRemoveNote(index)}
                          >
                            ×
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Col>
            </Row>

            <Row className={styles.row}>
              <Col lg={12}>
                <div className="relative">
                  <Label className={styles.label}>Eligible Countries</Label>
                  <Input
                    type="text"
                    className="placeholder:text-[#495057]"
                    value={countryQuery}
                    onChange={handleCountryInputChange}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Start typing to search countries..."
                  />

                  {showCountryDropdown && countryQuery.length > 1 && (
                    <div
                      className={styles.dropdown}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {isSearching ? (
                        <div className="px-4 py-2 text-gray-500">
                          Searching...
                        </div>
                      ) : searchResult?.length > 0 ? (
                        searchResult.map((country, index) => (
                          <div
                            key={index}
                            className={styles.dropdownItem}
                            onClick={() => handleAddCountry(country._id)}
                          >
                            {country.name}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-gray-500">
                          {countryQuery.length > 1
                            ? "No countries found"
                            : "Type to search countries"}
                        </div>
                      )}
                    </div>
                  )}

                  {validation.touched.eligibleCountries &&
                  validation.errors.eligibleCountries ? (
                    <FormFeedback className={styles.feedback} type="invalid">
                      {validation.errors.eligibleCountries}
                    </FormFeedback>
                  ) : null}

                  {validation.values.eligibleCountries.length > 0 && (
                    <div className={styles.tagContainer}>
                      {validation.values.eligibleCountries.map(
                        (country, index) => (
                          <div key={index} className={styles.tag}>
                            {country}
                            <span
                              className={styles.removeTag}
                              onClick={() => handleRemoveCountry(country)}
                            >
                              ×
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </Col>
            </Row>

            <Col lg={12}>
              <Button
                type="submit"
                style={{ backgroundColor: "#5156be" }}
                className="w-full mt-5"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Creating..." : "Create Account"}
              </Button>
            </Col>
          </form>
        </ModalBody>
      </Modal>
      {error && <Errormodal error={error} onClose={() => setError("")} />}
      {mutation.isSuccess && (
        <Successmodal
          successText={"Account added successfully."}
          onClose={() => {
            mutation.reset();
            setError("");
          }}
        />
      )}
    </React.Fragment>
  );
};

export default CreateSavingModal;
