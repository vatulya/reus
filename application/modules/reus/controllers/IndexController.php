<?php

class Reus_IndexController extends Zend_Controller_Action
{

    public $ajaxable = array(
        'index' => array('html'),
    );

    protected $_modelUser;

    public function init()
    {
        $this->_helper->getHelper('AjaxContext')->initContext();
    }

    public function preDispatch()
    {

    }

    public function indexAction()
    {
        /** @var Application_Model_User $user */
        $user = Application_Model_User::getInstance();
        $user = $user->getById(1);
    }

}