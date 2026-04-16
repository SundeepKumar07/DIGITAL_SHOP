import styles from "../../styles/styles";

const CheckoutSteps = ({ active }) => {
  const steps = [
    { id: 1, label: "Shipping" },
    { id: 2, label: "Payment" },
    { id: 3, label: "Success" },
  ];

  return (
    <div className="w-full flex justify-center px-2 mt-4">
      <div className="w-full max-w-2xl flex items-center justify-between">

        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center w-full">

            {/* STEP CIRCLE */}
            <div className="flex flex-col items-center text-center">
              <div
                className={`
                  w-8 h-8 md:w-10 md:h-10 
                  flex items-center justify-center 
                  rounded-full text-sm md:text-base font-semibold
                  transition-all duration-300
                  ${
                    active >= step.id
                      ? "bg-[#f63b60] text-white"
                      : "bg-[#FDE1E6] text-[#f63b60]"
                  }
                `}
              >
                {step.id}
              </div>

              {/* LABEL */}
              <span
                className={`
                  text-xs md:text-sm mt-1 font-medium
                  ${
                    active >= step.id
                      ? "text-black"
                      : "text-gray-400"
                  }
                `}
              >
                {step.label}
              </span>
            </div>

            {/* LINE */}
            {index !== steps.length - 1 && (
              <div className="flex-1 h-[3px] mx-2 md:mx-4 rounded">
                <div
                  className={`
                    h-full w-full transition-all duration-300
                    ${
                      active > step.id
                        ? "bg-[#f63b60]"
                        : "bg-[#FDE1E6]"
                    }
                  `}
                />
              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
};

export default CheckoutSteps;