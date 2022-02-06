import { useState } from "react"

const Step = ({
  step,
  setStep,
}: {
  step: number
  setStep: (params: number) => void
}) => (
  <div className="flex mt-14 justify-center w-full">
    {[1, 2].map((currentStep: number) => (
      <label
        key={currentStep}
        className={`ring-offset-2 ring-2 rounded-full w-2 h-2 mr-4 hover:cursor-pointer hover:ring-4 ${
          step === currentStep ? "bg-blue-900" : "bg-blue-100"
        }`}
        title={`step ${currentStep}`}
        onClick={() => setStep(currentStep)}
      />
    ))}
  </div>
)

const Step1 = ({
  setStep,
  values,
  changeValue,
}: {
  setStep: (params: number) => void
  values: InitialState
  changeValue: (params: React.ChangeEvent<HTMLInputElement>) => void
}) => (
  <>
    <label className="mb-2 flex">
      <span className="mr-2 flex-none">First Name</span>
      <input
        type="text"
        className="border w-full"
        name="firstName"
        value={values.firstName}
        onChange={changeValue}
      />
    </label>
    <label className="mb-2 flex">
      <span className="mr-2 flex-none">Last Name</span>
      <input
        type="text"
        className="border w-full"
        name="lastName"
        value={values.lastName}
        onChange={changeValue}
      />
    </label>
    <div className="flex justify-end">
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4"
        onClick={() => setStep(2)}
      >
        Continue
      </button>
    </div>
  </>
)

const Step2 = ({
  setStep,
  values,
  changeValue,
}: {
  setStep: (params: number) => void
  values: InitialState
  changeValue: (params: React.ChangeEvent<HTMLTextAreaElement>) => void
}) => (
  <>
    <label className="mb-2 flex">
      <span className="mr-2 flex-none">Message</span>
      <textarea
        name="message"
        className="border w-full"
        onChange={changeValue}
        value={values.message}
      />
    </label>
    <div className="flex w-full justify-between">
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4"
        onClick={() => setStep(1)}
      >
        Back
      </button>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4"
      >
        Submit
      </button>
    </div>
  </>
)

type InitialState = {
  firstName: string
  lastName: string
  message: string
}

const initialState = {
  firstName: "",
  lastName: "",
  message: "",
}

const Form = () => {
  const [step, setStep] = useState<number>(1)
  const [values, setValues] = useState<InitialState>(initialState)

  const changeValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    console.log(values)
  }

  return (
    <>
      <Step step={step} setStep={setStep} />
      <div className="mx-auto w-1/2 mt-4">
        <form onSubmit={handleSubmit}>
          {
            {
              1: (
                <Step1
                  setStep={setStep}
                  values={values}
                  changeValue={changeValue}
                />
              ),
              2: (
                <Step2
                  setStep={setStep}
                  values={values}
                  changeValue={changeValue}
                />
              ),
            }[step]
          }
        </form>
      </div>
    </>
  )
}

export default Form
