import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { userSchema } from "./Validation/validation";
import axios from "axios";
import useStyles from "./style";
import { Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
const Timeframe = [

  {
    label: "2 years",
    value: 1,
  },
  {
    label: "3 years",
    value: 2,
  },
  {
    label: "4 years",
    value: 3,
  },
  {
    label: "5 years",
    value: 4,
  },
];

const Country = [

  {
    label: "England",
    value: 1,
  },
  {
    label: "USA",
    value: 2,
  },
  {
    label: "Wales",
    value: 3,
  },
  {
    label: "Spain",
    value: 4,
  },
];

const CompanyHQ = [

  {
    label: "Florida",
    value: 1,
  },
  {
    label: "Mexico",
    value: 2,
  },
  {
    label: "Paris",
    value: 3,
  },
  {
    label: "Mumbai",
    value: 4,
  },
];

const HearAbout = [
  {
    label: "From LinkedIn",
    value: 1,
  },
  {
    label: "From Socail Media",
    value: 2,
  },
  {
    label: "Our employees",
    value: 3,
  },
  {
    label: "Other",
    value: 4,
  },
];


const Revenue = [

  {
    label: "$20,000",
    value: 1,
  },
  {
    label: "$40,000",
    value: 2,
  },
  {
    label: "$60,000",
    value: 3,
  },
  {
    label: "$80,000",
    value: 4,
  },
];


const Industry = [

  {
    label: "IT",
    value: 1,
  },
  {
    label: "Sales",
    value: 2,
  },
  {
    label: "HR",
    value: 3,
  },
  {
    label: "Finance",
    value: 4,
  },
];
function App() {
  const classes = useStyles();
  const [submitFormData, setsubmitFormData] = useState({
    FName: "",
    LName: "",
    Title: "",
    Company: "",
    Phone: "",
    Email: "",
    textAreaa: "",
    Country: "",
    CompanyHQ: "",
    HearAbout: "",
    Revenue: "",
    Industry: "",
    TimeFramee: "",
    Marketing: [],
    Sales: [],

  })

  const [Errors, setErrors] = useState()
  const getErrors = (err) => {
    const allErrors = {};
    err.inner.forEach((e) => {
      if (allErrors[e.path]) {
        allErrors[e.path].push(e);
      } else {
        allErrors[e.path] = [e];
      }
    });

    return allErrors;
  }


  const [checked1, setChecked1] = useState([])
  const getCheck1 = () => {
    axios.get('https://60d057db7de0b2001710859d.mockapi.io/Marketing')
      .then(function (response) {
        setChecked1(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const [checked2, setChecked2] = useState([])
  const getCheck2 = () => {
    axios.get('https://60d057db7de0b2001710859d.mockapi.io/Sales')
      .then(function (response) {
        setChecked2(response.data)
        // console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const onChangeCheckBox_For_Sale = (id) => {
    const selectedCheckboxes = submitFormData.Sales;
    const findIdx = selectedCheckboxes.indexOf(id);
    if (findIdx > -1) {
      selectedCheckboxes.splice(findIdx, 1);
    } else {
      selectedCheckboxes.push(id);
    }
    // setSales(selectedCheckboxes)

    setsubmitFormData({
      ...submitFormData,
      Sales: selectedCheckboxes
    })
  }

  const onChangeCheckBox = (id) => {
    const selectedCheckboxes = submitFormData.Marketing;
    const findIdx = selectedCheckboxes.indexOf(id);
    if (findIdx > -1) {
      selectedCheckboxes.splice(findIdx, 1);
    } else {
      selectedCheckboxes.push(id);
    }
    setsubmitFormData({
      ...submitFormData,
      Marketing: selectedCheckboxes
    })
    console.log(submitFormData.Marketing)

  }
  useEffect(() => {
    getCheck1()
    getCheck2()
  }, [])

  const onChangee = (e) => {
    const value = e.target.value
    console.log(value)
    setsubmitFormData({
      ...submitFormData, [e.target.name]: value,
    })
    setErrors({ ...Errors, [e.target.name]: "" })
  }

  const handleSubmit = async (e) => {
    // e.preventDefault();
    let formData = {
      FName: submitFormData.FName,
      LName: submitFormData.LName,
      Title: submitFormData.Title,
      Company: submitFormData.Company,
      Phone: submitFormData.Phone,
      Email: submitFormData.Email,
      textArea: submitFormData.textAreaa,
      Country: submitFormData.Country,
      CompanyHQ: submitFormData.CompanyHQ,
      HearAbout: submitFormData.HearAbout,
      Revenue: submitFormData.Revenue,
      Industry: submitFormData.Industry,
      TimeFrame: submitFormData.TimeFramee,
      Marketing: submitFormData.Marketing,
      Sales: submitFormData.Sales
    }
    setErrors({})
    const isValid = await userSchema.validate(formData, { abortEarly: false })

      .catch(function (err) {
        const allErrs = getErrors(err);
        setErrors(allErrs)

      });
    if (isValid !== undefined) {
      alert("Form submitted sucessfully")
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.maindiv}>
        <Typography variant='h6'>Section 1 - Required</Typography>
        <form className={classes.root} noValidate autoComplete="off">
          <div className={classes.form_div}>
            <InputLabel className={classes.labeltext} id="demo-simple-select-label">*First Name:</InputLabel>
            <div className={classes.errordiv}>
              {Errors?.FName ?
                <TextField error helperText={Errors?.FName?.[0]?.message} className={classes.input} name="FName" value={submitFormData.FName} onChange={e => {
                  onChangee(e)
                }} label="First Name" variant="outlined" />
                : <TextField className={classes.input} name="FName" value={submitFormData.FName} onChange={e => {
                  onChangee(e)
                }} label="First Name" variant="outlined" />
              }
            </div>
          </div>
          <div className={classes.form_div}>
            <InputLabel id="demo-simple-select-label" className={classes.labeltext}>*Last Name:</InputLabel>
            <div className={classes.errordiv}>
              {Errors?.LName ?
                <TextField error helperText={Errors?.LName?.[0]?.message} className={classes.input} name="LName" value={submitFormData.LName} onChange={e => {
                  onChangee(e)
                }} label="Last Name" variant="outlined" />
                : <TextField className={classes.input} name="LName" value={submitFormData.LName} onChange={e => {
                  onChangee(e)
                }} label="Last Name" variant="outlined" />
              }
            </div>
          </div>
          <div className={classes.form_div}>
            <InputLabel id="demo-simple-select-label" className={classes.labeltext}>*Title:</InputLabel>
            <div className={classes.errordiv}>
              {Errors?.Title ?
                <TextField error helperText={Errors?.Title?.[0]?.message} className={classes.input} name="Title" value={submitFormData.Title} onChange={e => {
                  onChangee(e)
                }} label="Title" variant="outlined" />
                : <TextField className={classes.input} name="Title" value={submitFormData.Title} onChange={e => {
                  onChangee(e)
                }} label="Title" variant="outlined" />
              }
            </div>
          </div>
          <div className={classes.form_div}>
            <InputLabel id="demo-simple-select-label" className={classes.labeltext}>*Company:</InputLabel>
            <div className={classes.errordiv}>
              {Errors?.Title ?
                <TextField error helperText={Errors?.Company?.[0]?.message} className={classes.input} name="Company" value={submitFormData.Company} onChange={e => {
                  onChangee(e)
                }} label="Company" variant="outlined" />
                : <TextField className={classes.input} name="Company" value={submitFormData.Company} onChange={e => {
                  onChangee(e)
                }} label="Company" variant="outlined" />
              }
            </div>
          </div>
          <div className={classes.form_div}>
            <InputLabel id="demo-simple-select-label" className={classes.labeltext}>*Phone:</InputLabel>
            <div className={classes.errordiv}>
              {Errors?.Phone ?
                <TextField error helperText={Errors?.Phone?.[0]?.message} className={classes.input} name="Phone" value={submitFormData.Phone} onChange={e => {
                  onChangee(e)
                }} label="Phone" variant="outlined" />
                : <TextField className={classes.input} name="Phone" value={submitFormData.Phone} onChange={e => {
                  onChangee(e)
                }} label="Phone" variant="outlined" />
              }
            </div>
          </div>
          <div className={classes.form_div}>
            <InputLabel id="demo-simple-select-label" className={classes.labeltext}>*Email:</InputLabel>
            <div className={classes.errordiv}>
              {Errors?.Email ?
                <TextField error helperText={Errors?.Email?.[0]?.message} className={classes.input} name="Email" value={submitFormData.Email} onChange={e => {
                  onChangee(e)
                }} label="Email" variant="outlined" />
                : <TextField className={classes.input} name="Email" value={submitFormData.Email} onChange={e => {
                  onChangee(e)
                }} label="Email" variant="outlined" />
              }
            </div>
          </div>
          <div className={classes.form_div}>
            <InputLabel id="demo-simple-select-label" className={classes.labeltext}>*Country:</InputLabel>
            <FormControl variant="outlined"  className={classes.formControl}>
              <InputLabel id="demo-simple-select-label" className={classes.labeltext}>Selcet</InputLabel>
              <div className={classes.errordiv}>
                <Select
                  name="Country"
                  value={submitFormData.Country}
                  className={classes.select}
                  onChange={e => {
                    onChangee(e)
                  }}
                >
                  {
                    Country.map((country) => <MenuItem value={country.label}>{country.label}</MenuItem>)
                  }
                </Select>
                <FormHelperText className={classes.errortext}>{Errors?.Country?.[0]?.message}</FormHelperText>
              </div>
            </FormControl>

          </div>
          <div className={classes.form_div}>
            <InputLabel id="demo-simple-select-label" className={classes.labeltext}>*Company HQ State/Province:</InputLabel>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-label" className={classes.labeltext}>Selcet</InputLabel>
              <div className={classes.errordiv}>
                <Select
                  name="CompanyHQ"
                  value={submitFormData.CompanyHQ}
                  className={classes.select}
                  onChange={e => {
                    onChangee(e)
                  }}
                >
                  {
                    CompanyHQ.map((companyHQ) => <MenuItem value={companyHQ.label}>{companyHQ.label}</MenuItem>)
                  }
                </Select>
                <FormHelperText className={classes.errortext}>{Errors?.CompanyHQ?.[0]?.message}</FormHelperText>
              </div>
            </FormControl>
          </div>
          <div className={classes.form_div}>
            <InputLabel id="demo-simple-select-label" className={classes.labeltext}>*How did you hear about Eloqua?</InputLabel>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-label" className={classes.labeltext}>Select</InputLabel>
              <div className={classes.errordiv}>
                <Select
                  name="HearAbout"
                  value={submitFormData.HearAbout}
                  className={classes.select}
                  onChange={e => {
                    onChangee(e)
                  }}
                >
                  {
                    HearAbout.map((hearAbout) => <MenuItem value={hearAbout.label}>{hearAbout.label}</MenuItem>)
                  }
                </Select>
                <FormHelperText className={classes.errortext}>{Errors?.HearAbout?.[0]?.message}</FormHelperText>
              </div>
            </FormControl>
          </div>
          <div className={classes.form_div}>
            <InputLabel id="demo-simple-select-label" className={classes.labeltext}>*Your Industry:</InputLabel>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-label" className={classes.labeltext}>Select</InputLabel>
              <div className={classes.errordiv}>
                <Select
                  name="Industry"
                  value={submitFormData.Industry}
                  className={classes.select}
                  onChange={e => {
                    onChangee(e)
                  }}
                >
                  {
                    Industry.map((industry) => <MenuItem value={industry.label}>{industry.label}</MenuItem>)
                  }
                </Select>
                <FormHelperText className={classes.errortext}>{Errors?.Industry?.[0]?.message}</FormHelperText>
              </div>
            </FormControl>
          </div>
          <div className={classes.form_div}>
            <InputLabel id="demo-simple-select-label" className={classes.labeltext}>*Your company Revenue ($ USD):</InputLabel>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-label" className={classes.labeltext}>Select</InputLabel>
              <div className={classes.errordiv}>
                <Select
                  name="Revenue"
                  value={submitFormData.Revenue}
                  className={classes.select}
                  onChange={e => {
                    onChangee(e)
                  }}
                >
                  {
                    Revenue.map((revenue) => <MenuItem value={revenue.label}>{revenue.label}</MenuItem>)
                  }
                </Select>
                <FormHelperText className={classes.errortext}>{Errors?.Revenue?.[0]?.message}</FormHelperText>
              </div>
            </FormControl>
          </div>

          <Typography variant='h6'>Section 2 - Optional</Typography>

          <div className={classes.form_div}>
            <InputLabel className={classes.labeltext}>My Top Marketing Challenges are:</InputLabel>
            <div>
              {checked1.map(item =>
                <section>
                  <InputLabel className={classes.labeltext} key={item.key}>
                    <Checkbox id="chechbox" name="Marketing"
                      className={classes.Checkbox}
                      selected={submitFormData.Marketing.includes(item.id)}
                      color="primary"
                      onChange={e => {
                        onChangeCheckBox(item.id)
                      }} />{item.value}</InputLabel>

                  {/* <br></br> */}
                </section>
              )}
                <FormHelperText className={classes.errortext}>{Errors?.Marketing?.[0]?.message}</FormHelperText>

            </div>
          </div>
          <div className={classes.form_div}>
            <InputLabel className={classes.labeltext}>Our Sales Team consists of:</InputLabel>
            <div>
              {checked2.map(item =>
                <section>
                  <InputLabel className={classes.labeltext} key={item.key}>
                    <Checkbox id="chechbox" name="Sales"
                      className={classes.Checkbox}
                      color="primary"
                      selected={submitFormData.Sales.includes(item.id)}
                      onChange={e => {
                        onChangeCheckBox_For_Sale(item.id)
                      }} type="checkbox" />{item.value}</InputLabel>
                  {/* <br></br> */}
                </section>
              )}
                <FormHelperText className={classes.errortext}>{Errors?.Sales?.[0]?.message}</FormHelperText>

            </div>
          </div>
          <div className={classes.form_div}>
            <InputLabel className={classes.labeltext}>I'm interested in finding out<br></br> more about:</InputLabel>
            <div className={classes.errordiv}>
              <TextareaAutosize className={classes.textArea} rowsMax={4} name="textAreaa" value={submitFormData.textAreaa} onChange={e => {
                onChangee(e)
              }} />
              <FormHelperText className={classes.errortext}>{Errors?.textArea?.[0]?.message}</FormHelperText>
            </div>
          </div>
          <div className={classes.form_div}>
            <InputLabel className={classes.labeltext}>My timeframe for a solution is:</InputLabel>
            <FormControl variant="outlined" className={classes.formControl}>
              <div className={classes.errordiv}>
                <InputLabel id="demo-simple-select-label" className={classes.labeltext}>Select</InputLabel>
                <Select
                  name="TimeFramee"
                  value={submitFormData.TimeFramee}
                  className={classes.select}
                  onChange={e => {
                    onChangee(e)
                  }}
                >
                  {
                    Timeframe.map((timeframe) => <MenuItem value={timeframe.label}>{timeframe.label}</MenuItem>)
                  }
                </Select>
                <FormHelperText className={classes.errortext}>{Errors?.TimeFrame?.[0]?.message}</FormHelperText>
              </div>
            </FormControl>
          </div>
          <Button variant="contained" className={classes.submit_btn} onClick={() => handleSubmit()} color="primary">
            submit
          </Button>
        </form>
      </div>
    </div >
  );
}

export default App;
