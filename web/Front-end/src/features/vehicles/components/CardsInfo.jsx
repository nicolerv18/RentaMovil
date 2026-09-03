    // src/components/ProcessSteps.jsx
    import React, { useState } from 'react';
    import { PROCESS_STEPS_MOCK } from '../data/mocks/stepsMocks';
    import './CardsInfo.style.css';
    import { branches } from "../../../shared/mocks/branches";
    import { useTranslation } from "react-i18next";
    import { FaCar, FaCheck, FaFile, FaMapMarked, FaMapMarkedAlt, FaShieldAlt } from 'react-icons/fa';
    import { Fa1, FaIdCard, FaIdCardClip, FaLocationDot, FaShield } from 'react-icons/fa6';
    import MapComponent from '../../booking/components/MapComponents';

    export const ProcessSteps = () => {
    const { t } = useTranslation();
    const [selectedBranch, setSelectedBranch] = useState(branches[0]);

    return (
        <section className="process-section">
        <div className="process-container">
            
            {/* Header Section */}
            <div className="process-header">
            <h2 className="process-title">{t('process.title')}</h2>
            <p className="process-subtitle">{t('process.subtitle')}</p>
            </div>

            {/* 4 Steps Grid */}
            <div className="steps-grid">
            {PROCESS_STEPS_MOCK.map((step) => {
                const Icon = step.iconComponent;
                
                return (
                <div key={step.id} className="step-card">
                    <div className="icon-container">
                    <Icon className="step-icon" />
                    </div>
                    <h3 className="card-title">{t(step.titleKey)}</h3>
                    <p className="card-description">{t(step.descriptionKey)}</p>
                </div>
                );
            })}
            </div>

            {/* Requirements and Brand Info Grid Row */}
            <div className="card-driver">
            
            {/* Left Panel: Rental Requirements */}
            <div className="information">
                <h3 className="card-title"> {t('requirements.title')}</h3>
                
                {/* Using a clean flex container instead of native unstyled ul lists */}
                <div className="card-features-list">
                <div className="feature-item">
                    <div className="item-card">
                        <div className='cardinfo-container'>
                        <div className='column-r'>
                        <FaIdCard className='cardId-icon'/>
                        </div>
                        <div className='column-l'>
                        <strong className="item-title">{t('requirements.license')}: </strong>
                        <span className="item-description">{t('requirements.licenseDescription')}</span>
                        </div>
                    </div>
                    </div>
                </div>
                
                <div className="feature-item1">
                    <div className="item-card">
                        <div className='cardinfo-container'>
                        <div className='column-r'>
                        <FaShieldAlt className='cardId-icon'/>
                        </div>
                        <div className='column-l'>
                        <strong className="item-title">{t('requirements.insurance')}: </strong>
                        <span className="item-description">{t('requirements.insuranceDescription')}</span>
                        </div>
                    </div>
                        </div>
                </div>
                
                <div className="feature-item1">
                    <div className="item-card">
                        <div className='cardinfo-container'>
                        <div className='column-r'>
                        <FaIdCardClip className='cardId-icon'/>
                        </div>
                        <div className='column-l'>
                        <strong className="item-title">{t('requirements.id')}: </strong>
                        <span className="item-description">{t('requirements.idDescription')}</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        
            {/* Right Panel: Corporate Information */}
            <div className="information">
                <div className='sub'>
                <h3 className="card-title">
                {t('title.rentamovil')}
            </h3>
                </div>

            <p className='driver-description'>
                {t('description.info-branches')}
            </p>

            <div className="branches-cards">
                {branches.map((branch) => (
                <div
                    key={branch.id}
                    className={`cards-branches${selectedBranch.id === branch.id ? ' is-selected' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedBranch.id === branch.id}
                    onClick={() => setSelectedBranch(branch)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            setSelectedBranch(branch);
                        }
                    }}
                >
                    <FaLocationDot className='branches-icon'/>
                    {branch.name}
                    <div>
                        {branch.address}
                    </div>
                </div>
                ))}
            </div>

            <div className="branches-map" aria-label="Mapa de sucursales">
                <MapComponent
                    mode="select"
                    branches={branches}
                    selectedBranch={selectedBranch}
                    setSelectedBranch={setSelectedBranch}
                />
            </div>
            </div>

            </div>

        </div>
        </section>
    );
    };

    export default ProcessSteps;
